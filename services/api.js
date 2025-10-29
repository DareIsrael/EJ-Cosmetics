// import api from '@/lib/axios';

// // Auth APIs
// export const authAPI = {
//   register: (userData) => api.post('/auth/register', userData),
//   login: (credentials) => api.post('/auth/login', credentials),
//   getMe: () => api.get('/auth/me'),
// };

// // Product APIs
// export const productAPI = {
//   getAll: () => api.get('/products'),
//   getById: (id) => api.get(`/products/${id}`),
//   create: (productData) => api.post('/products', productData),
//   update: (id, productData) => api.put(`/products/${id}`, productData),
//   delete: (id) => api.delete(`/products/${id}`),
// };

// // Order APIs
// export const orderAPI = {
//   getAll: () => api.get('/orders'),
//   getById: (id) => api.get(`/orders/${id}`),
//   create: (orderData) => api.post('/orders', orderData),
//   updateStatus: (id, statusData) => api.put(`/orders/${id}/status`, statusData),
// };

// // Payment APIs
// export const paymentAPI = {
//   initialize: (paymentData) => api.post('/payments/initialize', paymentData),
//   verify: (reference) => api.get(`/payments/verify/${reference}`),
// };

// export default api;


import api from '@/lib/axios';

// Auth APIs
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getMe: () => api.get('/auth/me'),
};

// Product APIs
export const productAPI = {
  getAll: () => api.get('/products'),
  getById: (id) => api.get(`/products/${id}`),
  create: (productData) => api.post('/products', productData),
  update: (id, productData) => api.put(`/products/${id}`, productData),
  delete: (id) => api.delete(`/products/${id}`),
};

// Order APIs (Now includes payment initialization)
export const orderAPI = {
  getAll: () => api.get('/orders'),
  getById: (id) => api.get(`/orders/${id}`),
  create: (orderData) => api.post('/orders', orderData), // This now returns payment URL
  updateStatus: (id, statusData) => api.put(`/orders/${id}/status`, statusData),
};

export const verifyAPI = {
  verifyPayment: async (reference) => {
    const response = await api.post('/verify', { reference });
    return response.data; // ✅ Only return the useful part
  },
};

export default api;