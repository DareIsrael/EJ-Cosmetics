import { NextResponse } from 'next/server';
import { authenticate } from '@/utils/auth';
import { getProductById, updateProduct, deleteProduct } from '@/controllers/productController';

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const result = await getProductById(id);

    if (!result.success) {
      return NextResponse.json(
        { message: result.message },
        { status: result.status }
      );
    }

    return NextResponse.json(result.data);
  } catch (error) {
    console.error('Get product route error:', error);
    return NextResponse.json(
      { message: 'Server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;

    // Admin-only: revalidate role from DB
    const user = await authenticate(request, { requireAdmin: true });
    if (!user) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const productData = await request.json();
    const result = await updateProduct(id, productData, user);

    if (!result.success) {
      console.error('Update product controller returned error:', result);
      return NextResponse.json(
        { message: result.message },
        { status: result.status }
      );
    }

    return NextResponse.json(result.data);
  } catch (error) {
    console.error('*** Update product route exception:', error);
    return NextResponse.json(
      { message: 'Server error', details: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    // Admin-only: revalidate role from DB
    const user = await authenticate(request, { requireAdmin: true });
    if (!user) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const result = await deleteProduct(id, user);

    if (!result.success) {
      return NextResponse.json(
        { message: result.message },
        { status: result.status }
      );
    }

    return NextResponse.json({ message: result.message });
  } catch (error) {
    console.error('Delete product route error:', error);
    return NextResponse.json(
      { message: 'Server error' },
      { status: 500 }
    );
  }
}