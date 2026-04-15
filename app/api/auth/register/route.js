import { NextResponse } from 'next/server';
import { registerUser } from '@/controllers/authController';
import { sanitizeInput } from '@/utils/sanitize';

export async function POST(request) {
  try {
    const rawData = await request.json();
    const userData = sanitizeInput(rawData);

    // Basic validation
    if (!userData.name || !userData.email || !userData.password) {
      return NextResponse.json(
        { message: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    if (userData.password.length < 6) {
      return NextResponse.json(
        { message: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    const result = await registerUser(userData);

    if (!result.success) {
      return NextResponse.json(
        { message: result.message },
        { status: result.status }
      );
    }

    // Return user data without token — client uses signIn() after registration
    return NextResponse.json({
      user: result.data.user,
    });
  } catch (error) {
    console.error('Register route error:', error);
    return NextResponse.json(
      { message: 'Server error' },
      { status: 500 }
    );
  }
}