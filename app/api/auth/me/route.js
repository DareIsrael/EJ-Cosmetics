import { NextResponse } from 'next/server';
import { authenticate } from '@/utils/auth';
import { getCurrentUser } from '@/controllers/authController';

export async function GET(request) {
  try {
    const user = await authenticate(request);
    
    if (!user) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get fresh user data
    const authHeader = request.headers.get('authorization');
    const token = authHeader.slice(7);
    const result = await getCurrentUser(token);

    if (!result.success) {
      return NextResponse.json(
        { message: result.message },
        { status: result.status }
      );
    }

    return NextResponse.json(result.data);
  } catch (error) {
    console.error('Get current user route error:', error);
    return NextResponse.json(
      { message: 'Server error' },
      { status: 500 }
    );
  }
}