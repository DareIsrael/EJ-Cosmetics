import api from '@/lib/axios';

// Auth APIs
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  getMe: () => api.get('/auth/me'),
};

// Product APIs
export const productAPI = {
  getAll: (params) => api.get('/products', { params }),
  getById: (id) => api.get(`/products/${id}`),
  create: (productData) => api.post('/products', productData),
  update: (id, productData) => api.put(`/products/${id}`, productData),
  delete: (id) => api.delete(`/products/${id}`),
};

// Order APIs
export const orderAPI = {
  getAll: (params) => api.get('/orders', { params }),
  getById: (id) => api.get(`/orders/${id}`),
  create: (orderData) => api.post('/orders', orderData),
  updateStatus: (id, statusData) => api.put(`/orders/${id}/status`, statusData),
};

// Payment verification — uses the canonical /api/payments/verify route
export const verifyAPI = {
  verifyPayment: async (reference) => {
    const response = await api.post('/payments/verify', { reference });
    return response.data;
  },
};

export default api;