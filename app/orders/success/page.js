/* eslint react/no-unescaped-entities: "off" */

// 'use client';
// import { useEffect, useState } from 'react';
// import { useSearchParams } from 'next/navigation';
// import Link from 'next/link';
// import { useCart } from '@/contexts/CartContext';

// export default function PaymentSuccess() {
//   const searchParams = useSearchParams();
//   const reference = searchParams.get('reference');
//   const { clearCart } = useCart();
//   const [verificationStatus, setVerificationStatus] = useState('verifying');
//   const [order, setOrder] = useState(null);

//   useEffect(() => {
//     if (reference) {
//       verifyPayment();
//     } else {
//       setVerificationStatus('error');
//     }
//   }, [reference]);

//   useEffect(() => {
//     // Clear cart on successful payment
//     if (verificationStatus === 'success') {
//       clearCart();
//     }
//   }, [verificationStatus, clearCart]);

//   const verifyPayment = async () => {
//     try {
//       const response = await fetch('/api/verify', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ reference }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setVerificationStatus('success');
//         setOrder(data.order);
//       } else {
//         setVerificationStatus('error');
//       }
//     } catch (error) {
//       console.error('Payment verification error:', error);
//       setVerificationStatus('error');
//     }
//   };

//   if (verificationStatus === 'verifying') {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
//           <p className="text-gray-600">Verifying your payment...</p>
//         </div>
//       </div>
//     );
//   }

//   if (verificationStatus === 'error') {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="text-red-500 text-6xl mb-4">❌</div>
//           <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Failed</h1>
//           <p className="text-gray-600 mb-6">We couldn't verify your payment. Please try again.</p>
//           <Link
//             href="/cart"
//             className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors"
//           >
//             Back to Cart
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="container mx-auto px-4">
//         <div className="max-w-2xl mx-auto text-center">
//           <div className="text-green-500 text-6xl mb-4">✅</div>
//           <h1 className="text-3xl font-bold text-gray-900 mb-4">Payment Successful!</h1>
//           <p className="text-gray-600 mb-6">
//             Thank you for your order. Your payment has been processed successfully.
//           </p>
          
//           {order && (
//             <div className="bg-white rounded-lg shadow-md p-6 mb-6 text-left">
//               <h2 className="text-xl font-semibold mb-4">Order Details</h2>
//               <p><strong>Order ID:</strong> #{order._id.slice(-6)}</p>
//               <p><strong>Total Amount:</strong> ₦{order.totalAmount.toLocaleString()}</p>
//               <p><strong>Status:</strong> 
//                 <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
//                   {order.paymentStatus}
//                 </span>
//               </p>
//             </div>
//           )}

//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Link
//               href="/orders"
//               className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors"
//             >
//               View My Orders
//             </Link>
//             <Link
//               href="/"
//               className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
//             >
//               Continue Shopping
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



// app/orders/success/page.js
'use client';
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get('orderId');
  const { clearCart } = useCart();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Clear cart on success page load
    clearCart();
    
    if (orderId) {
      fetchOrderDetails();
    } else {
      setLoading(false);
    }
  }, [orderId]);

  const fetchOrderDetails = async () => {
    try {
      const response = await fetch(`/api/orders/${orderId}`);
      if (response.ok) {
        const orderData = await response.json();
        setOrder(orderData);
      }
    } catch (error) {
      console.error('Error fetching order details:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-green-500 text-6xl mb-4">🎉</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Thank You for Your Order!</h1>
          <p className="text-gray-600 mb-8 text-lg">
            Your payment was successful and your order is being processed.
          </p>
          
          {order && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-8 text-left">
              <h2 className="text-xl font-semibold mb-4 border-b pb-2">Order Confirmation</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Order Number:</span>
                  <span className="font-semibold">#{order._id.slice(-8).toUpperCase()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Amount:</span>
                  <span className="font-semibold">₦{order.totalAmount?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {order.paymentStatus}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
            <p className="text-blue-800 text-sm">
              <strong>What's next?</strong> You'll receive an email confirmation shortly. 
              We'll notify you when your order ships.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/orders"
              className="bg-pink-600 text-white px-8 py-3 rounded-lg hover:bg-pink-700 transition-colors font-semibold"
            >
              View My Orders
            </Link>
            <Link
              href="/"
              className="bg-white text-pink-600 border border-pink-600 px-8 py-3 rounded-lg hover:bg-pink-50 transition-colors font-semibold"
            >
              Continue Shopping
            </Link>
          </div>

          <div className="mt-8 text-sm text-gray-500">
            <p>Need help? <Link href="/contact" className="text-pink-600 hover:text-pink-700">Contact our support team</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}