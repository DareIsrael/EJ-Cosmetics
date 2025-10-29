import { NextResponse } from 'next/server';
import { authenticate } from '@/utils/auth';
import { updateOrderStatus } from '@/controllers/orderController';

export async function PUT(request, { params }) {
  try {
    const user = await authenticate(request);
    if (!user) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const statusData = await request.json();
    const result = await updateOrderStatus(params.id, statusData, user);

    if (!result.success) {
      return NextResponse.json(
        { message: result.message },
        { status: result.status }
      );
    }

    return NextResponse.json(result.data);
  } catch (error) {
    console.error('Update order status route error:', error);
    return NextResponse.json(
      { message: 'Server error' },
      { status: 500 }
    );
  }
}


