import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // NextAuth session cookies are automatically sent with same-origin requests.
  // No manual Authorization header needed.
  withCredentials: true,
});

export default api;