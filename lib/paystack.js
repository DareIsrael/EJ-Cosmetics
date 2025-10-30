// import Paystack from 'paystack';

// const paystack = Paystack(process.env.PAYSTACK_SECRET_KEY);

// export default paystack;


import axios from 'axios';

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
const PAYSTACK_BASE_URL = 'https://api.paystack.co';
const FRONTEND_URL = process.env.NEXT_PUBLIC_API_URL; // 👈 Add this in .env
// Example: NEXT_PUBLIC_BASE_URL=http://localhost:3000 or https://yourdomain.com

/**
 * Initialize payment with Paystack
 */
export async function initializePayment(order, user) {
  try {
    const response = await axios.post(
      `${PAYSTACK_BASE_URL}/transaction/initialize`,
      {
        email: user.email,
        amount: order.totalAmount * 100, // Paystack expects amount in kobo
        metadata: {
          orderId: order._id.toString(),
          userId: user._id.toString(),
        },
        // 👇 Add this callback so Paystack redirects back to your site
        callback_url: `${FRONTEND_URL}/verify?reference=${order._id}`,
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
      return {
        success: false,
        message: data.message || 'Payment initialization failed',
        status: 400,
      };
    }

    return {
      success: true,
      data: {
        authorizationUrl: data.data.authorization_url,
        accessCode: data.data.access_code,
        reference: data.data.reference,
      },
    };
  } catch (error) {
    console.error('Initialize Payment Error:', error.response?.data || error.message);
    return {
      success: false,
      message: 'Error initializing payment',
      status: 500,
    };
  }
}

/**
 * Verify payment after Paystack callback
 */
export async function verifyPayment(reference) {
  try {
    const response = await axios.get(
      `${PAYSTACK_BASE_URL}/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const data = response.data;
    if (!data.status) {
      return {
        success: false,
        message: 'Payment verification failed',
        status: 400,
      };
    }

    const paymentData = data.data;
    return {
      success: true,
      data: {
        reference: paymentData.reference,
        status: paymentData.status,
        amount: paymentData.amount / 100,
        paidAt: paymentData.paid_at,
        orderId: paymentData.metadata?.orderId,
        userId: paymentData.metadata?.userId,
      },
    };
  } catch (error) {
    console.error('Verify Payment Error:', error.response?.data || error.message);
    return {
      success: false,
      message: 'Error verifying payment',
      status: 500,
    };
  }
}
