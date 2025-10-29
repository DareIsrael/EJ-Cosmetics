// import { initializePayment, verifyPayment } from './orderController';
import { initializePayment, verifyPayment } from '@/lib/paystack';


export async function handlePaymentInitialization(orderId, user) {
  try {
    const { getOrderById } = await import('./orderController');
    
    // Get the order
    const orderResult = await getOrderById(orderId, user);
    if (!orderResult.success) {
      return orderResult;
    }

    const order = orderResult.data;

    // Check if order is already paid
    if (order.paymentStatus === 'completed') {
      return { 
        success: false, 
        message: 'Order is already paid', 
        status: 400 
      };
    }

    // Initialize payment
    return await initializePayment(order, user);
  } catch (error) {
    console.error('Payment initialization error:', error);
    return { 
      success: false, 
      message: 'Failed to initialize payment', 
      status: 500 
    };
  }
}

export async function handlePaymentVerification(reference) {
  try {
    return await verifyPayment(reference);
  } catch (error) {
    console.error('Payment verification error:', error);
    return { 
      success: false, 
      message: 'Failed to verify payment', 
      status: 500 
    };
  }
}