// 'use client';
// import { useEffect, useState } from 'react';
// import { useSearchParams, useRouter } from 'next/navigation';
// import { verifyAPI } from '@/services/api';

// export default function VerifyPayment() {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const reference = searchParams.get('reference');
//   const [status, setStatus] = useState('verifying');

//   useEffect(() => {
//     if (reference) {
//       console.log('Verify page loaded with reference:', reference);
//       verifyPayment();
//     } else {
//       console.log('No reference found in URL');
//       setStatus('error');
//     }
//   }, [reference]);

//   const verifyPayment = async () => {
//     try {
//       console.log('Calling verify API with reference:', reference);
      
//       const response = await verifyAPI.verifyPayment(reference);
//       console.log('Verify API response:', response);

//       // Check if the API call was successful
//       if (response.success) {
//         setStatus('success');
//         setTimeout(() => {
//           router.push('/orders/success');
//         }, 2000);
//       } else {
//         setStatus('failed');
//         console.log('Payment verification failed:', response.message);
//         setTimeout(() => {
//           router.push('/orders/failed');
//         }, 2000);
//       }
//     } catch (error) {
//       console.error('Verification error:', error);
//       setStatus('error');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <div className="text-center">
//         {status === 'verifying' && (
//           <>
//             <div className="animate-spin rounded-full h-12 w-12 border-4 border-pink-500 border-t-transparent mx-auto mb-4"></div>
//             <p className="text-gray-600">Verifying your payment...</p>
//           </>
//         )}
//         {status === 'success' && (
//           <>
//             <div className="text-green-500 text-4xl mb-4">✓</div>
//             <p className="text-gray-600">Payment successful! Redirecting...</p>
//           </>
//         )}
//         {status === 'failed' && (
//           <>
//             <div className="text-red-500 text-4xl mb-4">✗</div>
//             <p className="text-gray-600">Payment failed! Redirecting...</p>
//           </>
//         )}
//         {status === 'error' && (
//           <>
//             <div className="text-red-500 text-4xl mb-4">⚠</div>
//             <p className="text-gray-600">Error verifying payment</p>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }



// app/api/verify/route.js


// 'use client';
// import { useEffect, useState } from 'react';
// import { useSearchParams, useRouter } from 'next/navigation';
// import { verifyAPI } from '@/services/api';
// import Link from 'next/link';

// export const dynamic = 'force-dynamic';

// export default function VerifyPayment() {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const reference = searchParams.get('reference');
//   const [status, setStatus] = useState('verifying');

//   useEffect(() => {
//     if (reference) {
//       verifyPayment();
//     } else {
//       setStatus('error');
//     }
//   }, [reference]);

//   const verifyPayment = async () => {
//     try {
//       const response = await verifyAPI.verifyPayment(reference);
//       console.log('Verification response from API:', response);

//       if (response.success) {
//         setStatus('success');
//         setTimeout(() => router.push('/orders/success'), 2000);
//       } else {
//         setStatus('failed');
//         setTimeout(() => router.push('/orders/failed'), 2000);
//       }
//     } catch (error) {
//       console.error('Verification error:', error);
//       setStatus('error');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <div className="text-center">
//         {status === 'verifying' && (
//           <>
//             <div className="animate-spin rounded-full h-12 w-12 border-4 border-pink-500 border-t-transparent mx-auto mb-4"></div>
//             <p className="text-gray-600">Verifying your payment...</p>
//           </>
//         )}
//         {status === 'success' && (
//           <>
//             <div className="text-green-500 text-4xl mb-4">✓</div>
//             <p className="text-gray-600">Payment successful! Redirecting...</p>
//           </>
//         )}
//         {status === 'failed' && (
//           <>
//             <div className="text-red-500 text-4xl mb-4">✗</div>
//             <p className="text-gray-600">Payment failed! Redirecting...</p>
//           </>
//         )}
//         {status === 'error' && (
//           <>
//             <div className="text-red-500 text-4xl mb-4">⚠</div>
//             <p className="text-gray-600">Error verifying payment</p>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }



// app/verify/page.js
'use client';
import { Suspense } from 'react';
import VerifyContent from './VerifyContent';

export default function VerifyPayment() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-pink-500 border-t-transparent mx-auto mb-2"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <VerifyContent />
    </Suspense>
  );
}