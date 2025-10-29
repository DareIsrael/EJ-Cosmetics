// 'use client';
// import { useCart } from '@/contexts/CartContext';
// import { useAuth } from '@/contexts/AuthContext';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';

// export default function Cart() {
//   const { cartItems, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();
//   const { user } = useAuth();
//   const router = useRouter();

//   const handleCheckout = () => {
//     if (!user) {
//       router.push('/login');
//       return;
//     }
//     router.push('/checkout');
//   };

//   if (cartItems.length === 0) {
//     return (
//       <div className="min-h-screen bg-gray-50 py-8">
//         <div className="container mx-auto px-4">
//           <div className="text-center">
//             <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
//             <p className="text-gray-600 mb-8">Your cart is empty</p>
//             <Link
//               href="/"
//               className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors"
//             >
//               Continue Shopping
//             </Link>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="container mx-auto px-4">
//         <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        
//         <div className="bg-white rounded-lg shadow-md overflow-hidden">
//           {cartItems.map((item) => (
//             <div key={item._id} className="border-b border-gray-200 last:border-b-0">
//               <div className="p-6 flex items-center">
//                 <img
//                   src={item.image}
//                   alt={item.name}
//                   className="w-20 h-20 object-cover rounded"
//                 />
                
//                 <div className="ml-6 flex-1">
//                   <h3 className="text-lg font-semibold">{item.name}</h3>
//                   <p className="text-pink-600 font-bold">₦{item.price.toLocaleString()}</p>
//                 </div>

//                 <div className="flex items-center space-x-4">
//                   <div className="flex items-center space-x-2">
//                     <button
//                       onClick={() => updateQuantity(item._id, item.quantity - 1)}
//                       className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
//                     >
//                       -
//                     </button>
//                     <span className="w-12 text-center">{item.quantity}</span>
//                     <button
//                       onClick={() => updateQuantity(item._id, item.quantity + 1)}
//                       disabled={item.quantity >= item.stock}
//                       className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       +
//                     </button>
//                   </div>

//                   <div className="text-right w-24">
//                     <p className="font-semibold">
//                       ₦{(item.price * item.quantity).toLocaleString()}
//                     </p>
//                   </div>

//                   <button
//                     onClick={() => removeFromCart(item._id)}
//                     className="text-red-500 hover:text-red-700"
//                   >
//                     Remove
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}

//           <div className="p-6 bg-gray-50">
//             <div className="flex justify-between items-center mb-4">
//               <span className="text-xl font-semibold">Total:</span>
//               <span className="text-2xl font-bold text-pink-600">
//                 ₦{getCartTotal().toLocaleString()}
//               </span>
//             </div>
            
//             <div className="flex space-x-4">
//               <button
//                 onClick={clearCart}
//                 className="flex-1 bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition-colors"
//               >
//                 Clear Cart
//               </button>
//               <button
//                 onClick={handleCheckout}
//                 className="flex-1 bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition-colors"
//               >
//                 Proceed to Checkout
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

'use client';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';


export default function Cart() {
  const { 
    cartItems, 
    updateQuantity, 
    removeFromCart, 
    getSubtotal, 
    getTotalAmount, 
    getDeliveryFee,
    clearCart 
  } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = async () => {
    if (!user) {
      router.push('/login');
      return;
    }

    setIsCheckingOut(true);
    
    // Add a small delay for better UX
    setTimeout(() => {
      router.push('/checkout');
      setIsCheckingOut(false);
    }, 500);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
            <p className="text-gray-600 mb-8">Your cart is empty</p>
            <Link
              href="/"
              className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {cartItems.map((item) => (
            <div key={item._id} className="border-b border-gray-200 last:border-b-0">
              <div className="p-6 flex items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                
                <div className="ml-6 flex-1">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-pink-600 font-bold">₦{item.price.toLocaleString()}</p>
                  {item.stock < 10 && (
                    <p className="text-xs text-orange-600 mt-1">
                      Only {item.stock} left in stock
                    </p>
                  )}
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                    >
                      -
                    </button>
                    <span className="w-12 text-center font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      disabled={item.quantity >= item.stock}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      +
                    </button>
                  </div>

                  <div className="text-right w-24">
                    <p className="font-semibold">
                      ₦{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>

                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-red-500 hover:text-red-700 transition-colors p-2 rounded-lg hover:bg-red-50"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="p-6 bg-gray-50">
            {/* Price Breakdown */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center text-gray-600">
                <span>Subtotal:</span>
                <span className="font-medium">₦{getSubtotal().toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-gray-600">
                <span>Delivery Fee:</span>
                <span className="font-medium">₦{getDeliveryFee().toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-lg font-semibold border-t pt-3">
                <span>Total:</span>
                <span className="text-pink-600 text-xl">
                  ₦{getTotalAmount().toLocaleString()}
                </span>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={clearCart}
                disabled={isCheckingOut}
                className="flex-1 bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                Clear Cart
              </button>
              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="flex-1 bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold relative"
              >
                {isCheckingOut ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    <span>Processing...</span>
                  </div>
                ) : (
                  'Proceed to Checkout'
                )}
              </button>
            </div>

            {/* Security Badge */}
            <div className="mt-4 flex items-center justify-center space-x-2 text-sm text-gray-600">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Secure checkout with Paystack</span>
            </div>

            {/* Free Delivery Notice */}
            {getSubtotal() > 10000 && (
              <div className="mt-3 bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                <p className="text-green-700 text-sm font-medium">
                  🎉 You qualify for free delivery on orders over ₦10,000!
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Continue Shopping Link */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center text-pink-600 hover:text-pink-700 font-medium"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}