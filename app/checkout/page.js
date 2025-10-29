// 'use client';
// import { useState } from 'react';
// import { useCart } from '@/contexts/CartContext';
// import { useAuth } from '@/contexts/AuthContext';
// import { useRouter } from 'next/navigation';
// import { orderAPI } from '@/services/api';
// import toast from 'react-hot-toast';

// export default function Checkout() {
//   const { cartItems, getCartTotal, clearCart } = useCart();
//   const { user } = useAuth();
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [shippingAddress, setShippingAddress] = useState({
//     name: '',
//     address: '',
//     city: '',
//     postalCode: '',
//     country: 'Nigeria',
//     phone: ''
//   });

//   const handleInputChange = (e) => {
//     setShippingAddress({
//       ...shippingAddress,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handlePlaceOrder = async () => {
//     if (!user) {
//       toast.error('Please log in to place an order');
//       router.push('/login');
//       return;
//     }

//     setLoading(true);

//     try {
//       // 1. Create order
//       const orderData = {
//         items: cartItems.map(item => ({
//           productId: item._id,
//           quantity: item.quantity
//         })),
//         shippingAddress,
//         paymentMethod: 'paystack'
//       };

//       const orderResponse = await orderAPI.create(orderData);
//       console.log('Order response:', orderResponse.data);

//      const order = orderResponse.data;


//       // 2. Initialize payment
//       const paymentResponse = await fetch('/api/payments/initialize', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('token')}`
//         },
//         body: JSON.stringify({ orderId: order._id })
//       });

//       const paymentData = await paymentResponse.json();

//       if (!paymentResponse.ok) {
//         throw new Error(paymentData.message || 'Payment initialization failed');
//       }

//       // 3. Redirect to Paystack
//       window.location.href = paymentData.authorizationUrl;

//     } catch (error) {
//       console.error('Checkout error:', error);
//       toast.error(error.message || 'Failed to place order');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (cartItems.length === 0) {
//     return (
//       <div className="min-h-screen bg-gray-50 py-8">
//         <div className="container mx-auto px-4">
//           <div className="text-center">
//             <h1 className="text-3xl font-bold mb-4">Checkout</h1>
//             <p className="text-gray-600 mb-8">Your cart is empty</p>
//             <button
//               onClick={() => router.push('/')}
//               className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors"
//             >
//               Continue Shopping
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="container mx-auto px-4">
//         <h1 className="text-3xl font-bold mb-8">Checkout</h1>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {/* Shipping Address */}
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Full Name
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={shippingAddress.name}
//                   onChange={handleInputChange}
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-pink-500 focus:border-pink-500"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Address
//                 </label>
//                 <textarea
//                   name="address"
//                   value={shippingAddress.address}
//                   onChange={handleInputChange}
//                   rows="3"
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-pink-500 focus:border-pink-500"
//                   required
//                 />
//               </div>
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     City
//                   </label>
//                   <input
//                     type="text"
//                     name="city"
//                     value={shippingAddress.city}
//                     onChange={handleInputChange}
//                     className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-pink-500 focus:border-pink-500"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Postal Code
//                   </label>
//                   <input
//                     type="text"
//                     name="postalCode"
//                     value={shippingAddress.postalCode}
//                     onChange={handleInputChange}
//                     className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-pink-500 focus:border-pink-500"
//                     required
//                   />
//                 </div>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Phone Number
//                 </label>
//                 <input
//                   type="tel"
//                   name="phone"
//                   value={shippingAddress.phone}
//                   onChange={handleInputChange}
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-pink-500 focus:border-pink-500"
//                   required
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Order Summary */}
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
//             <div className="space-y-4">
//               {cartItems.map((item) => (
//                 <div key={item._id} className="flex justify-between items-center">
//                   <div className="flex items-center space-x-3">
//                     <img
//                       src={item.image}
//                       alt={item.name}
//                       className="w-12 h-12 object-cover rounded"
//                     />
//                     <div>
//                       <p className="font-medium">{item.name}</p>
//                       <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
//                     </div>
//                   </div>
//                   <p className="font-semibold">
//                     ₦{(item.price * item.quantity).toLocaleString()}
//                   </p>
//                 </div>
//               ))}
              
//               <div className="border-t pt-4">
//                 <div className="flex justify-between items-center text-lg font-semibold">
//                   <span>Total:</span>
//                   <span>₦{getCartTotal().toLocaleString()}</span>
//                 </div>
//               </div>

//               <button
//                 onClick={handlePlaceOrder}
//                 disabled={loading}
//                 className="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {loading ? 'Processing...' : 'Proceed to Payment'}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


// app/checkout/page.js
// // app/checkout/page.js
// 'use client';
// import { useState } from 'react';
// import { useCart } from '@/contexts/CartContext';
// import { useAuth } from '@/contexts/AuthContext';
// import { useRouter } from 'next/navigation';
// import { orderAPI } from '@/services/api';
// import toast from 'react-hot-toast';

// export default function Checkout() {
//   const { cartItems, getCartTotal, clearCart } = useCart();
//   const { user } = useAuth();
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [touched, setTouched] = useState({});
  
//   const [shippingAddress, setShippingAddress] = useState({
//     name: '',
//     address: '',
//     city: '',
//     postalCode: '',
//     country: 'Nigeria',
//     phone: ''
//   });

//   // Validation rules
//   const validationRules = {
//     name: {
//       required: true,
//       minLength: 2,
//       maxLength: 100,
//       pattern: /^[a-zA-Z\s]+$/,
//       message: 'Name should contain only letters and spaces (2-100 characters)'
//     },
//     address: {
//       required: true,
//       minLength: 10,
//       maxLength: 200,
//       message: 'Address should be at least 10 characters long'
//     },
//     city: {
//       required: true,
//       minLength: 2,
//       maxLength: 50,
//       pattern: /^[a-zA-Z\s]+$/,
//       message: 'City should contain only letters and spaces'
//     },
//     postalCode: {
//       required: true,
//       pattern: /^[0-9]{5,10}$/,
//       message: 'Postal code should be 5-10 digits'
//     },
//     phone: {
//       required: true,
//       pattern: /^(?:\+234|0)[789][01]\d{8}$/,
//       message: 'Please enter a valid Nigerian phone number (e.g., 08012345678 or +2348012345678)'
//     }
//   };

//   const validateField = (name, value) => {
//     const rules = validationRules[name];
//     if (!rules) return '';

//     if (rules.required && !value.trim()) {
//       return 'This field is required';
//     }

//     if (rules.minLength && value.length < rules.minLength) {
//       return `Minimum ${rules.minLength} characters required`;
//     }

//     if (rules.maxLength && value.length > rules.maxLength) {
//       return `Maximum ${rules.maxLength} characters allowed`;
//     }

//     if (rules.pattern && !rules.pattern.test(value)) {
//       return rules.message;
//     }

//     return '';
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     let isValid = true;

//     Object.keys(validationRules).forEach(field => {
//       const error = validateField(field, shippingAddress[field]);
//       if (error) {
//         newErrors[field] = error;
//         isValid = false;
//       }
//     });

//     setErrors(newErrors);
//     return isValid;
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
    
//     setShippingAddress(prev => ({
//       ...prev,
//       [name]: value
//     }));

//     // Clear error when user starts typing
//     if (errors[name]) {
//       const error = validateField(name, value);
//       setErrors(prev => ({
//         ...prev,
//         [name]: error
//       }));
//     }
//   };

//   const handleBlur = (e) => {
//     const { name, value } = e.target;
//     setTouched(prev => ({ ...prev, [name]: true }));
    
//     const error = validateField(name, value);
//     setErrors(prev => ({
//       ...prev,
//       [name]: error
//     }));
//   };

//   const handlePlaceOrder = async () => {
//     if (!user) {
//       toast.error('Please log in to place an order');
//       router.push('/login');
//       return;
//     }

//     // Mark all fields as touched to show errors
//     const allTouched = {};
//     Object.keys(validationRules).forEach(field => {
//       allTouched[field] = true;
//     });
//     setTouched(allTouched);

//     // Validate form
//     if (!validateForm()) {
//       toast.error('Please fix the errors in the form');
//       return;
//     }

//     setLoading(true);

//     try {
//       console.log('🛒 Starting checkout process...');
      
//       const orderData = {
//         items: cartItems.map(item => ({
//           productId: item._id,
//           quantity: item.quantity
//         })),
//         shippingAddress
//       };

//       console.log('📦 Order data:', orderData);

//       const response = await orderAPI.create(orderData);
//       console.log('✅ Order & Payment response:', response);

//       if (!response.data) {
//         throw new Error('No response data received');
//       }

//       if (response.data.authorizationUrl) {
//         console.log('🔗 Redirecting to Paystack...');
//         window.location.href = response.data.authorizationUrl;
//       } else {
//         throw new Error('Payment initialization failed - no authorization URL received');
//       }

//     } catch (error) {
//       console.error('❌ Checkout error:', error);
      
//       const errorMessage = error.response?.data?.message 
//         || error.message 
//         || 'Failed to place order. Please try again.';
      
//       toast.error(errorMessage);
      
//       if (error.response) {
//         console.error('Error response:', error.response);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getInputClassName = (fieldName) => {
//     const baseClass = "w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 transition-colors";
    
//     if (errors[fieldName] && touched[fieldName]) {
//       return `${baseClass} border-red-500 focus:ring-red-500 focus:border-red-500 bg-red-50`;
//     }
    
//     return `${baseClass} border-gray-300 focus:ring-pink-500 focus:border-pink-500`;
//   };

//   if (cartItems.length === 0) {
//     return (
//       <div className="min-h-screen bg-gray-50 py-8">
//         <div className="container mx-auto px-4">
//           <div className="text-center">
//             <h1 className="text-3xl font-bold mb-4">Checkout</h1>
//             <p className="text-gray-600 mb-8">Your cart is empty</p>
//             <button
//               onClick={() => router.push('/')}
//               className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors"
//             >
//               Continue Shopping
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="container mx-auto px-4">
//         <h1 className="text-3xl font-bold mb-8">Checkout</h1>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {/* Shipping Address */}
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
//             <div className="space-y-4">
//               {/* Full Name */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Full Name *
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={shippingAddress.name}
//                   onChange={handleInputChange}
//                   onBlur={handleBlur}
//                   className={getInputClassName('name')}
//                   placeholder="Enter your full name"
//                   required
//                 />
//                 {errors.name && touched.name && (
//                   <p className="text-red-500 text-xs mt-1 flex items-center">
//                     <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
//                     </svg>
//                     {errors.name}
//                   </p>
//                 )}
//               </div>

//               {/* Address */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Delivery Address *
//                 </label>
//                 <textarea
//                   name="address"
//                   value={shippingAddress.address}
//                   onChange={handleInputChange}
//                   onBlur={handleBlur}
//                   rows="3"
//                   className={getInputClassName('address')}
//                   placeholder="Enter your complete delivery address including street, building, and landmarks"
//                   required
//                 />
//                 {errors.address && touched.address && (
//                   <p className="text-red-500 text-xs mt-1 flex items-center">
//                     <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
//                     </svg>
//                     {errors.address}
//                   </p>
//                 )}
//               </div>

//               {/* City & Postal Code */}
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     City *
//                   </label>
//                   <input
//                     type="text"
//                     name="city"
//                     value={shippingAddress.city}
//                     onChange={handleInputChange}
//                     onBlur={handleBlur}
//                     className={getInputClassName('city')}
//                     placeholder="e.g. Lagos"
//                     required
//                   />
//                   {errors.city && touched.city && (
//                     <p className="text-red-500 text-xs mt-1 flex items-center">
//                       <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                         <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
//                       </svg>
//                       {errors.city}
//                     </p>
//                   )}
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Postal Code *
//                   </label>
//                   <input
//                     type="text"
//                     name="postalCode"
//                     value={shippingAddress.postalCode}
//                     onChange={handleInputChange}
//                     onBlur={handleBlur}
//                     className={getInputClassName('postalCode')}
//                     placeholder="e.g. 100001"
//                     required
//                   />
//                   {errors.postalCode && touched.postalCode && (
//                     <p className="text-red-500 text-xs mt-1 flex items-center">
//                       <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                         <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
//                       </svg>
//                       {errors.postalCode}
//                     </p>
//                   )}
//                 </div>
//               </div>

//               {/* Phone Number */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Phone Number *
//                 </label>
//                 <input
//                   type="tel"
//                   name="phone"
//                   value={shippingAddress.phone}
//                   onChange={handleInputChange}
//                   onBlur={handleBlur}
//                   className={getInputClassName('phone')}
//                   placeholder="e.g. 08012345678 or +2348012345678"
//                   required
//                 />
//                 {errors.phone && touched.phone && (
//                   <p className="text-red-500 text-xs mt-1 flex items-center">
//                     <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
//                     </svg>
//                     {errors.phone}
//                   </p>
//                 )}
//                 <p className="text-xs text-gray-500 mt-1">
//                   We'll contact you for delivery updates
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Order Summary */}
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
//             <div className="space-y-4">
//               {cartItems.map((item) => (
//                 <div key={item._id} className="flex justify-between items-center border-b pb-3">
//                   <div className="flex items-center space-x-3">
//                     <img
//                       src={item.image}
//                       alt={item.name}
//                       className="w-12 h-12 object-cover rounded"
//                     />
//                     <div>
//                       <p className="font-medium text-sm">{item.name}</p>
//                       <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
//                     </div>
//                   </div>
//                   <p className="font-semibold text-sm">
//                     ₦{(item.price * item.quantity).toLocaleString()}
//                   </p>
//                 </div>
//               ))}
              
//               <div className="border-t pt-4 space-y-2">
//                 <div className="flex justify-between text-gray-600">
//                   <span>Subtotal:</span>
//                   <span>₦{getCartTotal().toLocaleString()}</span>
//                 </div>
//                 <div className="flex justify-between text-gray-600">
//                   <span>Shipping:</span>
//                   <span className="text-green-600">Free</span>
//                 </div>
//                 <div className="flex justify-between items-center text-lg font-semibold border-t pt-2">
//                   <span>Total:</span>
//                   <span className="text-pink-600">₦{getCartTotal().toLocaleString()}</span>
//                 </div>
//               </div>

//               {/* Security Badge */}
//               <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
//                 <div className="flex items-center justify-center space-x-2 text-green-700">
//                   <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                   </svg>
//                   <span className="text-sm font-medium">Secure Payment with Paystack</span>
//                 </div>
//               </div>

//               <button
//                 onClick={handlePlaceOrder}
//                 disabled={loading || Object.keys(errors).some(key => errors[key])}
//                 className="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg"
//               >
//                 {loading ? (
//                   <div className="flex items-center justify-center space-x-2">
//                     <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
//                     <span>Processing...</span>
//                   </div>
//                 ) : (
//                   'Proceed to Payment'
//                 )}
//               </button>

//               <p className="text-xs text-gray-500 text-center">
//                 You will be redirected to Paystack to complete your payment securely
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }






// // app/checkout/page.js
'use client';
import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { orderAPI } from '@/services/api';
import toast from 'react-hot-toast';

export default function Checkout() {
  const { cartItems, getSubtotal, getTotalAmount, getDeliveryFee } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  
  const [shippingAddress, setShippingAddress] = useState({
    name: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Nigeria',
    phone: ''
  });

  // Validation rules
  const validationRules = {
    name: {
      required: true,
      minLength: 2,
      maxLength: 100,
      pattern: /^[a-zA-Z\s]+$/,
      message: 'Name should contain only letters and spaces (2-100 characters)'
    },
    address: {
      required: true,
      minLength: 10,
      maxLength: 200,
      message: 'Address should be at least 10 characters long'
    },
    city: {
      required: true,
      minLength: 2,
      maxLength: 50,
      pattern: /^[a-zA-Z\s]+$/,
      message: 'City should contain only letters and spaces'
    },
    postalCode: {
      required: true,
      pattern: /^[0-9]{5,10}$/,
      message: 'Postal code should be 5-10 digits'
    },
    phone: {
      required: true,
      pattern: /^(?:\+234|0)[789][01]\d{8}$/,
      message: 'Please enter a valid Nigerian phone number'
    }
  };

  const validateField = (name, value) => {
    const rules = validationRules[name];
    if (!rules) return '';

    if (rules.required && !value.trim()) {
      return 'This field is required';
    }

    if (rules.minLength && value.length < rules.minLength) {
      return `Minimum ${rules.minLength} characters required`;
    }

    if (rules.maxLength && value.length > rules.maxLength) {
      return `Maximum ${rules.maxLength} characters allowed`;
    }

    if (rules.pattern && !rules.pattern.test(value)) {
      return rules.message;
    }

    return '';
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    Object.keys(validationRules).forEach(field => {
      const error = validateField(field, shippingAddress[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setShippingAddress(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handlePlaceOrder = async () => {
    if (!user) {
      toast.error('Please log in to place an order');
      router.push('/login');
      return;
    }

    // Mark all fields as touched to show errors
    const allTouched = {};
    Object.keys(validationRules).forEach(field => {
      allTouched[field] = true;
    });
    setTouched(allTouched);

    // Validate form
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setLoading(true);

    try {
      console.log('🛒 Starting checkout process...');
      
      const orderData = {
        items: cartItems.map(item => ({
          productId: item._id,
          quantity: item.quantity
        })),
        shippingAddress
      };

      console.log('📦 Order data:', orderData);

      const response = await orderAPI.create(orderData);
      console.log('✅ Order & Payment response:', response);

      if (!response.data) {
        throw new Error('No response data received');
      }

      if (response.data.authorizationUrl) {
        console.log('🔗 Redirecting to Paystack...');
        window.location.href = response.data.authorizationUrl;
      } else {
        throw new Error('Payment initialization failed - no authorization URL received');
      }

    } catch (error) {
      console.error('❌ Checkout error:', error);
      
      const errorMessage = error.response?.data?.message 
        || error.message 
        || 'Failed to place order. Please try again.';
      
      toast.error(errorMessage);
      
      if (error.response) {
        console.error('Error response:', error.response);
      }
    } finally {
      setLoading(false);
    }
  };

  const getInputClassName = (fieldName) => {
    const baseClass = "w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 transition-colors";
    
    if (errors[fieldName] && touched[fieldName]) {
      return `${baseClass} border-red-500 focus:ring-red-500 focus:border-red-500 bg-red-50`;
    }
    
    return `${baseClass} border-gray-300 focus:ring-pink-500 focus:border-pink-500`;
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Checkout</h1>
            <p className="text-gray-600 mb-8">Your cart is empty</p>
            <button
              onClick={() => router.push('/')}
              className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Shipping Address */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
            <div className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={shippingAddress.name}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={getInputClassName('name')}
                  required
                />
                {errors.name && touched.name && (
                  <p className="text-red-500 text-xs mt-1 flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Delivery Address *
                </label>
                <textarea
                  name="address"
                  value={shippingAddress.address}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  rows="3"
                  className={getInputClassName('address')}
                  required
                />
                {errors.address && touched.address && (
                  <p className="text-red-500 text-xs mt-1 flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    {errors.address}
                  </p>
                )}
              </div>

              {/* City & Postal Code */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={shippingAddress.city}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={getInputClassName('city')}
                    required
                  />
                  {errors.city && touched.city && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      {errors.city}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Postal Code *
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={shippingAddress.postalCode}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={getInputClassName('postalCode')}
                    required
                  />
                  {errors.postalCode && touched.postalCode && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      {errors.postalCode}
                    </p>
                  )}
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={shippingAddress.phone}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={getInputClassName('phone')}
                  required
                />
                {errors.phone && touched.phone && (
                  <p className="text-red-500 text-xs mt-1 flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    {errors.phone}
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  We'll contact you for delivery updates
                </p>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item._id} className="flex justify-between items-center pb-3">
                  <div className="flex items-center space-x-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-semibold text-sm">
                    ₦{(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
              
              {/* Price Breakdown with Faded Dividers */}
              <div className="space-y-2 pt-2">
                <div className="flex justify-between text-gray-600 pb-2">
                  <span>Subtotal:</span>
                  <span>₦{getSubtotal().toLocaleString()}</span>
                </div>
                
                <div className="border-t border-gray-100"></div>
                
                <div className="flex justify-between text-gray-600 py-2">
                  <span>Delivery Fee:</span>
                  <span>₦{getDeliveryFee().toLocaleString()}</span>
                </div>
                
                <div className="border-t border-gray-100"></div>
                
                <div className="flex justify-between items-center text-lg font-semibold pt-2">
                  <span>Total:</span>
                  <span className="text-pink-600">₦{getTotalAmount().toLocaleString()}</span>
                </div>
              </div>

              {/* Security Badge */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                <div className="flex items-center justify-center space-x-2 text-green-700">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium">Secure Payment with Paystack</span>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={loading || Object.keys(errors).some(key => errors[key])}
                className="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    <span>Processing...</span>
                  </div>
                ) : (
                  'Proceed to Payment'
                )}
              </button>

              <p className="text-xs text-gray-500 text-center">
                You will be redirected to Paystack to complete your payment securely
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}