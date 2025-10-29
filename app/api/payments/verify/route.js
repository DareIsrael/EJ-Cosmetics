// import { NextResponse } from 'next/server';
// import { handlePaymentVerification } from '@/controllers/paymentController';

// export async function POST(request) {
//   try {
//     const { reference } = await request.json();
    
//     if (!reference) {
//       return NextResponse.json(
//         { message: 'Payment reference is required' },
//         { status: 400 }
//       );
//     }

//     const result = await handlePaymentVerification(reference);

//     if (!result.success) {
//       return NextResponse.json(
//         { message: result.message },
//         { status: result.status }
//       );
//     }

//     return NextResponse.json(result.data);
//   } catch (error) {
//     console.error('Verify payment route error:', error);
//     return NextResponse.json(
//       { message: 'Server error' },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from 'next/server';
import { verifyOrderPayment } from '@/controllers/orderController';

export async function POST(request) {
  try {
    const { reference } = await request.json();
    
    if (!reference) {
      return NextResponse.json(
        { success: false, message: 'Reference is required' },
        { status: 400 }
      );
    }

    const result = await verifyOrderPayment(reference);

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: result.status }
      );
    }

    return NextResponse.json({
      success: true,
      data: result.data
    });
  } catch (error) {
    console.error('Verify payment route error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}