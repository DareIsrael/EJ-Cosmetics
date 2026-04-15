
'use client';
import { Suspense } from 'react';
import FailedContent from './FailedContent';

export default function PaymentFailed() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-pink-500 border-t-transparent mx-auto mb-2"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <FailedContent />
    </Suspense>
  );
}