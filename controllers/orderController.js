// import dbConnect from '@/lib/mongodb';
// import Order from '@/models/Order';

// export async function getAllOrders(user) {
//   try {
//     await dbConnect();
    
//     // If admin, return all orders. If user, return only their orders
//     const query = user.role === 'admin' ? {} : { userId: user._id };
//     const orders = await Order.find(query)
//       .populate('userId', 'name email')
//       .populate('items.productId')
//       .sort({ createdAt: -1 });

//     return { success: true, data: orders };
//   } catch (error) {
//     console.error('Get orders error:', error);
//     return { success: false, message: 'Failed to fetch orders', status: 500 };
//   }
// }

// export async function getOrderById(id, user) {
//   try {
//     await dbConnect();
    
//     const query = user.role === 'admin' ? { _id: id } : { _id: id, userId: user._id };
//     const order = await Order.findOne(query)
//       .populate('userId', 'name email')
//       .populate('items.productId');

//     if (!order) {
//       return { success: false, message: 'Order not found', status: 404 };
//     }

//     return { success: true, data: order };
//   } catch (error) {
//     console.error('Get order error:', error);
//     return { success: false, message: 'Failed to fetch order', status: 500 };
//   }
// }

// export async function createOrder(orderData, user) {
//   try {
//     await dbConnect();
    
//     const { items, shippingAddress } = orderData;

//     // Validate items and calculate total
//     let totalAmount = 0;
//     const orderItems = [];

//     // Import Product model dynamically
//     const { default: Product } = await import('@/models/Product');

//     for (const item of items) {
//       const product = await Product.findById(item.productId);
//       if (!product) {
//         return { 
//           success: false, 
//           message: `Product with ID ${item.productId} not found`, 
//           status: 404 
//         };
//       }

//       if (product.stock < item.quantity) {
//         return { 
//           success: false, 
//           message: `Insufficient stock for ${product.name}. Only ${product.stock} available`, 
//           status: 400 
//         };
//       }

//       totalAmount += product.price * item.quantity;
//       orderItems.push({
//         productId: product._id,
//         quantity: item.quantity,
//         price: product.price,
//       });
//     }

//     // Create order with pending payment
//     const order = await Order.create({
//       userId: user._id,
//       items: orderItems,
//       totalAmount,
//       shippingAddress,
//       paymentStatus: 'pending',
//       orderStatus: 'processing',
//     });

//     await order.populate('items.productId');

//     return { 
//       success: true, 
//       data: order
//     };
//   } catch (error) {
//     console.error('Create order error:', error);
//     return { success: false, message: 'Failed to create order', status: 500 };
//   }
// }

// export async function updateOrderStatus(id, statusData, user) {
//   try {
//     if (user.role !== 'admin') {
//       return { success: false, message: 'Unauthorized', status: 401 };
//     }

//     await dbConnect();
    
//     const order = await Order.findByIdAndUpdate(
//       id,
//       { orderStatus: statusData.orderStatus },
//       { new: true }
//     ).populate('userId', 'name email')
//      .populate('items.productId');

//     if (!order) {
//       return { success: false, message: 'Order not found', status: 404 };
//     }

//     return { success: true, data: order };
//   } catch (error) {
//     console.error('Update order status error:', error);
//     return { success: false, message: 'Failed to update order status', status: 500 };
//   }
// }


// controllers/orderController.js
import axios from 'axios';
import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
const PAYSTACK_BASE_URL = 'https://api.paystack.co';
const FRONTEND_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Get all orders (Admin or User)
 */
export async function getAllOrders(user) {
  try {
    await dbConnect();
    const query = user.role === 'admin' ? {} : { userId: user._id };
    const orders = await Order.find(query)
      .populate('userId', 'name email')
      .populate('items.productId')
      .sort({ createdAt: -1 });

    return { success: true, data: orders };
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
  try {
    await dbConnect();

    const { items, shippingAddress } = orderData;
    const { default: Product } = await import('@/models/Product');

    let subtotal = 0;
    const orderItems = [];
    const DELIVERY_FEE = 800; // Delivery fee constant

    // Calculate subtotal and validate stock
    for (const item of items) {
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

    // Calculate total amount including delivery fee
    const totalAmount = subtotal + DELIVERY_FEE;

    // Create order in pending state
    const order = await Order.create({
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
        amount: totalAmount * 100, // Include delivery fee in payment amount
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
    return { success: false, message: 'Error creating order', status: 500 };
  }
}

/**
 * Verify Paystack payment and update order status
 */
/**
 * Verify Paystack payment and update order status
 */
export async function verifyOrderPayment(reference) {
  try {
    await dbConnect();

    console.log('Verifying payment with reference:', reference);

    const response = await axios.get(`${PAYSTACK_BASE_URL}/transaction/verify/${reference}`, {
      headers: { Authorization: `Bearer ${PAYSTACK_SECRET_KEY}` },
    });

    const data = response.data;
    console.log('Paystack verification response:', data);
    console.log('Paystack verification raw data:', JSON.stringify(data, null, 2));

    if (!data.status) {
      return { success: false, message: 'Payment verification failed', status: 400 };
    }

    const paymentData = data.data;
    const orderId = paymentData.metadata?.orderId;
    
    console.log('Found order ID from metadata:', orderId);
    console.log('Payment status from Paystack:', paymentData.status);

    // Find order by orderId from metadata (not by paymentReference)
    const order = await Order.findById(orderId);

    if (!order) {
      console.log('Order not found with ID:', orderId);
      return { success: false, message: 'Order not found', status: 404 };
    }

    console.log('Order found, current payment status:', order.paymentStatus);

    // Update order based on payment status
    if (paymentData.status === 'success') {
      order.paymentStatus = 'completed';
      order.orderStatus = 'processing';
      order.paidAt = new Date();
      order.paymentReference = reference; // Save the actual Paystack reference
      
      console.log('Updating order to completed status');
      
      // Update product stock
      await updateProductStock(order.items);
      
      await order.save();
      console.log('Order successfully updated to completed');

      return {
        success: true,
        data: {
          orderId: order._id,
          status: order.paymentStatus,
          reference: paymentData.reference,
        },
      };
    } else {
      console.log('Payment not successful, status:', paymentData.status);
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



