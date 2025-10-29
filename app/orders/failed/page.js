'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PaymentFailed() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [countdown, setCountdown] = useState(5);
  const [isRetrying, setIsRetrying] = useState(false);

  const errorMessage = searchParams.get('message') || 'Your payment was not successful.';
  const orderId = searchParams.get('orderId');

  useEffect(() => {
    if (!isRetrying) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            router.push('/cart');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [router, isRetrying]);

  const handleRetry = () => {
    setIsRetrying(true);
    // Here you could implement retry logic
    // For now, just redirect to cart
    router.push('/cart');
  };

  const commonIssues = [
    'Insufficient funds in your account',
    'Card declined by your bank',
    'Incorrect card details entered',
    'Network connectivity issues',
    'Transaction timeout'
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-md p-8">
        {/* Error Header */}
        <div className="text-center mb-8">
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-red-100 mb-4">
            <svg 
              className="h-10 w-10 text-red-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Payment Unsuccessful
          </h1>
          <p className="text-gray-600">{errorMessage}</p>
        </div>

        {/* Order Details */}
        {orderId && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Order Reference:</span>
              <span className="font-mono text-sm bg-white px-2 py-1 rounded border">
                {orderId}
              </span>
            </div>
          </div>
        )}

        {/* Common Issues */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Common Issues
          </h3>
          <ul className="space-y-2">
            {commonIssues.map((issue, index) => (
              <li key={index} className="flex items-start">
                <svg 
                  className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
                </svg>
                <span className="text-gray-600 text-sm">{issue}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Countdown */}
        {!isRetrying && (
          <div className="mb-6 text-center">
            <p className="text-sm text-gray-500">
              Redirecting to cart in <span className="font-semibold text-pink-600">{countdown}</span> seconds
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleRetry}
            disabled={isRetrying}
            className="w-full bg-pink-600 text-white py-3 px-4 rounded-lg hover:bg-pink-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isRetrying ? 'Processing...' : 'Try Payment Again'}
          </button>
          
          <button
            onClick={() => router.push('/')}
            className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Continue Shopping
          </button>

          <div className="flex space-x-3">
            <button
              onClick={() => router.push('/contact')}
              className="flex-1 text-pink-600 py-2 px-4 rounded-lg hover:text-pink-700 transition-colors text-sm font-medium border border-pink-200 hover:border-pink-300"
            >
              Contact Support
            </button>
            <button
              onClick={() => router.push('/help')}
              className="flex-1 text-gray-600 py-2 px-4 rounded-lg hover:text-gray-700 transition-colors text-sm font-medium border border-gray-200 hover:border-gray-300"
            >
              Help Center
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}