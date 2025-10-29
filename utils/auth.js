import { verifyToken } from './jwt';

export async function authenticate(request) {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }

    const token = authHeader.slice(7);
    const decoded = verifyToken(token);

    if (!decoded) {
      return null;
    }

    // Import dynamically to avoid circular dependencies
    const { default: dbConnect } = await import('@/lib/mongodb');
    const { default: User } = await import('@/models/User');
    
    await dbConnect();
    
    const user = await User.findById(decoded.userId).select('-password');
    
    return user;
  } catch (error) {
    console.error('Authentication error:', error);
    return null;
  }
}