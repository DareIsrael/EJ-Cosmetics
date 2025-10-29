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