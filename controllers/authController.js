import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { generateToken, verifyToken } from '@/utils/jwt';
import { generateResetToken, hashResetToken } from '@/utils/passwordReset';
import { sendPasswordResetEmail } from '@/lib/email';
import bcrypt from 'bcryptjs';



export async function registerUser(userData) {
  try {
    await dbConnect();
    const { name, email, password } = userData;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return { success: false, message: 'User already exists', status: 400 };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generate token
    const token = generateToken(user._id);

    // Return user without password
    const userWithoutPassword = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    return { 
      success: true, 
      data: { user: userWithoutPassword, token } 
    };
  } catch (error) {
    console.error('Register error:', error);
    return { success: false, message: 'Server error', status: 500 };
  }
}

export async function loginUser(credentials) {
  try {
    await dbConnect();
    const { email, password } = credentials;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return { success: false, message: 'Invalid credentials', status: 400 };
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return { success: false, message: 'Invalid credentials', status: 400 };
    }

    // Generate token
    const token = generateToken(user._id);

    // Return user without password
    const userWithoutPassword = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    return { 
      success: true, 
      data: { user: userWithoutPassword, token } 
    };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, message: 'Server error', status: 500 };
  }
}

export async function getCurrentUser(token) {
  try {
    await dbConnect();
    
    const { verifyToken } = await import('@/utils/jwt');
    const decoded = verifyToken(token);

    if (!decoded) {
      return { success: false, message: 'Invalid token', status: 401 };
    }

    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      return { success: false, message: 'User not found', status: 404 };
    }

    return { success: true, data: user };
  } catch (error) {
    console.error('Get current user error:', error);
    return { success: false, message: 'Server error', status: 500 };
  }
}

export async function forgotPassword(email) {
  try {
    await dbConnect();
    
    const user = await User.findOne({ email });
    if (!user) {
      // Don't reveal whether email exists or not
      return { 
        success: true, 
        message: 'If an account with that email exists, you will receive a password reset link.' 
      };
    }

    // Generate reset token
    const resetToken = generateResetToken();
    const hashedToken = hashResetToken(resetToken);

    // Save to user
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpire = Date.now() + 3600000; // 1 hour
    await user.save();

    // Send email
    const emailResult = await sendPasswordResetEmail(user.email, resetToken);
    
    if (!emailResult.success) {
      return { 
        success: false, 
        message: 'Failed to send reset email', 
        status: 500 
      };
    }

    return { 
      success: true, 
      message: 'If an account with that email exists, you will receive a password reset link.' 
    };
  } catch (error) {
    console.error('Forgot password error:', error);
    return { success: false, message: 'Server error', status: 500 };
  }
}

export async function resetPassword(token, newPassword) {
  try {
    await dbConnect();
    
    const hashedToken = hashResetToken(token);
    
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
      return { 
        success: false, 
        message: 'Invalid or expired reset token', 
        status: 400 
      };
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // Update user
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    return { 
      success: true, 
      message: 'Password reset successfully' 
    };
  } catch (error) {
    console.error('Reset password error:', error);
    return { success: false, message: 'Server error', status: 500 };
  }
}