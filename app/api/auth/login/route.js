import { NextResponse } from 'next/server';
import { loginUser } from '@/controllers/authController';

export async function POST(request) {
  try {
    const credentials = await request.json();
    const result = await loginUser(credentials);

    if (!result.success) {
      return NextResponse.json(
        { message: result.message },
        { status: result.status }
      );
    }

    return NextResponse.json(result.data);
  } catch (error) {
    console.error('Login route error:', error);
    return NextResponse.json(
      { message: 'Server error' },
      { status: 500 }
    );
  }
}