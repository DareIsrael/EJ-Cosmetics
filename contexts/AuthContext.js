// 'use client';
// import { createContext, useState, useContext, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { authAPI } from '@/services/api';
// import toast from 'react-hot-toast';

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     checkUser();
//   }, []);

//   const checkUser = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       if (token) {
//         const response = await authAPI.getMe();
//         setUser(response.data);
//       }
//     } catch (error) {
//       console.error('Auth check failed:', error);
//       localStorage.removeItem('token');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const login = async (email, password) => {
//     try {
//       const response = await authAPI.login({ email, password });
//       const { user: userData, token } = response.data;

//       localStorage.setItem('token', token);
//       setUser(userData);
//       toast.success('Login successful!');
      
//       // Redirect based on role
//       if (userData.role === 'admin') {
//         router.push('/admin');
//       } else {
//         router.push('/');
//       }
      
//       return { success: true };
//     } catch (error) {
//       const message = error.response?.data?.message || 'Login failed';
//       toast.error(message);
//       return { success: false, message };
//     }
//   };

//   const register = async (name, email, password) => {
//     try {
//       const response = await authAPI.register({ name, email, password });
//       const { user: userData, token } = response.data;

//       localStorage.setItem('token', token);
//       setUser(userData);
//       toast.success('Registration successful!');
//       router.push('/');
      
//       return { success: true };
//     } catch (error) {
//       const message = error.response?.data?.message || 'Registration failed';
//       toast.error(message);
//       return { success: false, message };
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     setUser(null);
//     router.push('/');
//     toast.success('Logged out successfully!');
//   };

//   return (
//     <AuthContext.Provider value={{ 
//       user, 
//       login, 
//       register, 
//       logout, 
//       loading,
//       isAdmin: user?.role === 'admin'
//     }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => useContext(AuthContext);



'use client';
import { createContext, useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authAPI } from '@/services/api';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
  try {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      setUser(JSON.parse(storedUser)); // restore immediately for instant UI
    }

    if (token) {
      // Optionally verify token with backend
      const response = await authAPI.getMe();
      if (response.data) {
        setUser(response.data);
        localStorage.setItem('user', JSON.stringify(response.data)); // keep updated
      }
    } else {
      setUser(null);
    }
  } catch (error) {
    console.error('Auth check failed:', error);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  } finally {
    setLoading(false);
  }
};


  const login = async (email, password) => {
  try {
    const response = await authAPI.login({ email, password });
    const { user: userData, token } = response.data;

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData)); // ✅ Add this line
    setUser(userData);
    toast.success('Login successful!');

    // Redirect based on role
    if (userData.role === 'admin') {
      router.push('/admin');
    } else {
      router.push('/');
    }

    return { success: true };
  } catch (error) {
    const message = error.response?.data?.message || 'Login failed';
    toast.error(message);
    return { success: false, message };
  }
};

const register = async (name, email, password) => {
  try {
    const response = await authAPI.register({ name, email, password });
    const { user: userData, token } = response.data;

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData)); // ✅ Add this line too
    setUser(userData);
    toast.success('Registration successful!');
    router.push('/');

    return { success: true };
  } catch (error) {
    const message = error.response?.data?.message || 'Registration failed';
    toast.error(message);
    return { success: false, message };
  }
};


  const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  setUser(null);
  router.push('/');
  toast.success('Logged out successfully!');
};

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      logout, 
      loading,
      isAdmin: user?.role === 'admin'
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);