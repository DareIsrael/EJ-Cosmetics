import { NextResponse } from 'next/server';
import { authenticate } from '@/utils/auth';
import { updateOrderStatus } from '@/controllers/orderController';

export async function PUT(request, { params }) {
  try {
    const { id } = await params;

    // Use requireAdmin to revalidate admin role from DB
    const user = await authenticate(request, { requireAdmin: true });
    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const statusData = await request.json();
    const result = await updateOrderStatus(id, statusData, user);

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
