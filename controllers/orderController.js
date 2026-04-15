import axios from 'axios';
import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';
import { isValidObjectId } from '@/utils/sanitize';

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
const PAYSTACK_BASE_URL = 'https://api.paystack.co';
const FRONTEND_URL = process.env.NEXT_PUBLIC_BASE_URL;

/**
 * Get all orders (Admin sees all, User sees own)
 */
export async function getAllOrders(user, { page = 1, limit = 0 } = {}) {
  try {
    await dbConnect();
    const query = user.role === 'admin' ? {} : { userId: user._id };
    
    const parsedPage = parseInt(page, 10);
    const parsedLimit = parseInt(limit, 10);

    const totalItems = await Order.countDocuments(query);
    const actualLimit = parsedLimit > 0 ? parsedLimit : Math.max(totalItems, 1);
    const totalPages = Math.ceil(totalItems / actualLimit);
    const skip = (parsedPage - 1) * actualLimit;

    const orders = await Order.find(query)
      .populate('userId', 'name email')
      .populate('items.productId')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(actualLimit);

    return { 
      success: true, 
      data: {
        totalItems,
        totalPages: parsedLimit > 0 ? totalPages : 1,
        currentPage: parsedPage,
        data: orders
      }
    };
  } catch (error) {
    console.error('Get orders error:', error);
    return { success: false, message: 'Failed to fetch orders', status: 500 };
  }
}

/**
 * Get single order by ID
 */
export async function getOrderById(id, user) {
  try {
    if (!isValidObjectId(id)) {
      return { success: false, message: 'Invalid order ID', status: 400 };
    }

    await dbConnect();
    const query = user.role === 'admin' ? { _id: id } : { _id: id, userId: user._id };
    const order = await Order.findOne(query)
      .populate('userId', 'name email')
      .populate('items.productId');

    if (!order) return { success: false, message: 'Order not found', status: 404 };

    return { success: true, data: order };
  } catch (error) {
    console.error('Get order error:', error);
    return { success: false, message: 'Failed to fetch order', status: 500 };
  }
}

/**
 * Create new order and initialize Paystack payment
 */
export async function createOrder(orderData, user) {
  let order = null;

  try {
    await dbConnect();

    const { items, shippingAddress } = orderData;

    // Validate items array
    if (!items || !Array.isArray(items) || items.length === 0) {
      return { success: false, message: 'Order must contain at least one item', status: 400 };
    }

    // Validate shipping address
    if (!shippingAddress || !shippingAddress.name || !shippingAddress.address || !shippingAddress.phone) {
      return { success: false, message: 'Shipping address is incomplete', status: 400 };
    }

    const { default: Product } = await import('@/models/Product');

    let subtotal = 0;
    const orderItems = [];
    const DELIVERY_FEE = 800;

    // Calculate subtotal and validate stock
    for (const item of items) {
      if (!isValidObjectId(item.productId)) {
        return { success: false, message: 'Invalid product ID in order', status: 400 };
      }

      const product = await Product.findById(item.productId);
      if (!product) {
        return { success: false, message: `Product not found`, status: 404 };
      }
      if (product.stock < item.quantity) {
        return { success: false, message: `Insufficient stock for ${product.name}`, status: 400 };
      }

      subtotal += product.price * item.quantity;
      orderItems.push({
        productId: product._id,
        quantity: item.quantity,
        price: product.price,
      });
    }

    const totalAmount = subtotal + DELIVERY_FEE;

    // Create order in pending state
    order = await Order.create({
      userId: user._id,
      items: orderItems,
      subtotal,
      deliveryFee: DELIVERY_FEE,
      totalAmount,
      shippingAddress,
      paymentStatus: 'pending',
      orderStatus: 'processing',
    });

    // Initialize Paystack payment
    const response = await axios.post(
      `${PAYSTACK_BASE_URL}/transaction/initialize`,
      {
        email: user.email,
        amount: totalAmount * 100,
        metadata: {
          orderId: order._id.toString(),
          userId: user._id.toString(),
        },
        callback_url: `${FRONTEND_URL}/verify`,
      },
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const data = response.data;
    if (!data.status) {
      // Payment init failed — clean up the orphaned order
      order.paymentStatus = 'failed';
      order.orderStatus = 'cancelled';
      await order.save();
      return { success: false, message: 'Failed to initialize payment', status: 400 };
    }

    // Save reference to order
    order.paymentReference = data.data.reference;
    await order.save();

    return {
      success: true,
      data: {
        authorizationUrl: data.data.authorization_url,
        reference: data.data.reference,
        orderId: order._id,
        subtotal,
        deliveryFee: DELIVERY_FEE,
        totalAmount,
      },
    };
  } catch (error) {
    console.error('Create order & init payment error:', error.response?.data || error.message);

    // If order was created but payment failed, mark it as failed
    if (order && order._id) {
      try {
        order.paymentStatus = 'failed';
        order.orderStatus = 'cancelled';
        await order.save();
      } catch (cleanupError) {
        console.error('Order cleanup error:', cleanupError);
      }
    }

    return { success: false, message: 'Error creating order', status: 500 };
  }
}

/**
 * Verify Paystack payment and update order status
 */
export async function verifyOrderPayment(reference) {
  try {
    await dbConnect();

    if (!reference || typeof reference !== 'string') {
      return { success: false, message: 'Invalid payment reference', status: 400 };
    }

    const response = await axios.get(`${PAYSTACK_BASE_URL}/transaction/verify/${encodeURIComponent(reference)}`, {
      headers: { Authorization: `Bearer ${PAYSTACK_SECRET_KEY}` },
    });

    const data = response.data;

    if (!data.status) {
      return { success: false, message: 'Payment verification failed', status: 400 };
    }

    const paymentData = data.data;
    const orderId = paymentData.metadata?.orderId;

    if (!orderId || !isValidObjectId(orderId)) {
      return { success: false, message: 'Invalid order reference in payment', status: 400 };
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return { success: false, message: 'Order not found', status: 404 };
    }

    // Prevent double-processing
    if (order.paymentStatus === 'completed') {
      return {
        success: true,
        data: {
          orderId: order._id,
          status: order.paymentStatus,
          reference: paymentData.reference,
        },
      };
    }

    if (paymentData.status === 'success') {
      order.paymentStatus = 'completed';
      order.orderStatus = 'processing';
      order.paidAt = new Date();
      order.paymentReference = reference;

      await updateProductStock(order.items);
      await order.save();

      return {
        success: true,
        data: {
          orderId: order._id,
          status: order.paymentStatus,
          reference: paymentData.reference,
        },
      };
    } else {
      order.paymentStatus = 'failed';
      order.orderStatus = 'cancelled';
      await order.save();

      return {
        success: false,
        message: `Payment status: ${paymentData.status}`,
        status: 400,
        data: {
          orderId: order._id,
          status: order.paymentStatus,
        },
      };
    }
  } catch (error) {
    console.error('Verify payment error:', error.response?.data || error.message);
    return { success: false, message: 'Error verifying payment', status: 500 };
  }
}

/**
 * Admin: Update order status manually
 */
export async function updateOrderStatus(id, statusData, user) {
  try {
    if (user.role !== 'admin') {
      return { success: false, message: 'Unauthorized', status: 401 };
    }

    if (!isValidObjectId(id)) {
      return { success: false, message: 'Invalid order ID', status: 400 };
    }

    const validStatuses = ['processing', 'coming', 'delivered', 'cancelled'];
    if (!validStatuses.includes(statusData.orderStatus)) {
      return { success: false, message: 'Invalid order status', status: 400 };
    }

    await dbConnect();
    const order = await Order.findByIdAndUpdate(
      id,
      { orderStatus: statusData.orderStatus },
      { new: true }
    ).populate('userId', 'name email')
     .populate('items.productId');

    if (!order) return { success: false, message: 'Order not found', status: 404 };

    return { success: true, data: order };
  } catch (error) {
    console.error('Update order status error:', error);
    return { success: false, message: 'Failed to update order status', status: 500 };
  }
}

/**
 * Helper function to update product stock
 */
async function updateProductStock(items) {
  try {
    const { default: Product } = await import('@/models/Product');
    
    for (const item of items) {
      await Product.findByIdAndUpdate(
        item.productId,
        { $inc: { stock: -item.quantity } }
      );
    }
  } catch (error) {
    console.error('Update product stock error:', error);
    throw error;
  }
}
