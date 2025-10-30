// components/CustomToast.js
import { Toaster } from 'react-hot-toast';

export default function CustomToast() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: '#fff',
          color: '#000',
          border: '1px solid #f472b6',
          borderRadius: '8px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        },
        success: {
          duration: 3000,
          iconTheme: {
            primary: '#ec4899',
            secondary: '#fff',
          },
          style: {
            background: '#fdf2f8',
            color: '#831843',
            border: '1px solid #fbcfe8',
          },
        },
        error: {
          duration: 5000,
          iconTheme: {
            primary: '#dc2626',
            secondary: '#fff',
          },
          style: {
            background: '#fef2f2',
            color: '#991b1b',
            border: '1px solid #fecaca',
          },
        },
        loading: {
          style: {
            background: '#f3f4f6',
            color: '#374151',
            border: '1px solid #d1d5db',
          },
        },
      }}
    />
  );
}