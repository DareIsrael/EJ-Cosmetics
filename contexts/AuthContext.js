'use client';
import { createContext, useContext } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const loading = status === 'loading';
  const user = session?.user || null;

  const login = async (email, password) => {
    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        toast.error(result.error || 'Login failed');
        return { success: false, message: result.error };
      }

      toast.success('Login successful!');

      // Redirect based on role — session may not be immediately updated,
      // so we fetch the session to get the role
      const sessionRes = await fetch('/api/auth/session');
      const sessionData = await sessionRes.json();

      if (sessionData?.user?.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/');
      }

      return { success: true };
    } catch (error) {
      const message = error.message || 'Login failed';
      toast.error(message);
      return { success: false, message };
    }
  };

  const register = async (name, email, password) => {
    try {
      // Step 1: Create the user via the existing register API
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        const message = data.message || 'Registration failed';
        toast.error(message);
        return { success: false, message };
      }

      // Step 2: Auto sign-in with NextAuth after registration
      const signInResult = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (signInResult?.error) {
        toast.error('Account created but auto-login failed. Please log in.');
        router.push('/login');
        return { success: true };
      }

      toast.success('Registration successful!');
      router.push('/');
      return { success: true };
    } catch (error) {
      const message = error.message || 'Registration failed';
      toast.error(message);
      return { success: false, message };
    }
  };

  const logout = async () => {
    await signOut({ redirect: false });
    router.push('/');
    toast.success('Logged out successfully!');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        loading,
        isAdmin: user?.role === 'admin',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);