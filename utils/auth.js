import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

/**
 * Authenticate the current request using NextAuth session.
 * Returns the user object from the database, or null if unauthenticated.
 *
 * @param {Request} request - Not used directly; NextAuth reads cookies from headers.
 * @param {Object} options
 * @param {boolean} options.requireAdmin - If true, revalidates admin role from DB.
 * @returns {Object|null} User document (without password) or null.
 */
export async function authenticate(request, { requireAdmin = false } = {}) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return null;
    }

    // For non-admin requests, return session user directly (fast path)
    if (!requireAdmin) {
      await dbConnect();
      const user = await User.findById(session.user.id).select('-password');
      if (!user) return null;
      return user;
    }

    // For admin actions, always revalidate role from database
    await dbConnect();
    const user = await User.findById(session.user.id).select('-password');

    if (!user) return null;
    if (user.role !== 'admin') return null;

    return user;
  } catch (error) {
    console.error('Authentication error:', error);
    return null;
  }
}