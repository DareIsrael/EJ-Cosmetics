import { NextResponse } from 'next/server';
import { registerUser } from '@/controllers/authController';

export async function POST(request) {
  try {
    const userData = await request.json();
    const result = await registerUser(userData);

    if (!result.success) {
      return NextResponse.json(
        { message: result.message },
        { status: result.status }
      );
    }

    return NextResponse.json(result.data);
  } catch (error) {
    console.error('Register route error:', error);
    return NextResponse.json(
      { message: 'Server error' },
      { status: 500 }
    );
  }
}