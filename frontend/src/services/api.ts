import axios from 'axios';

const API_BASE_URL = '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 6000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  login: (username: string, password: string) =>
    api.post('/auth/login', { username, password }),
  me: () => api.get('/auth/me'),
};

export const tourismApi = {
  getServices: (params?: { category?: string; search?: string }) =>
    api.get('/tourism/services', { params }),
  getServiceById: (id: number) => api.get(`/tourism/services/${id}`),
  createService: (data: any) => api.post('/tourism/services', data),
  updateService: (id: number, data: any) => api.put(`/tourism/services/${id}`, data),
  deleteService: (id: number) => api.delete(`/tourism/services/${id}`),
};

export const contactApi = {
  send: (data: { name: string; email: string; phone?: string; subject: string; message: string }) =>
    api.post('/contact', data),
  getAll: () => api.get('/contact'),
  markAsRead: (id: number) => api.patch(`/contact/${id}/read`),
};

export const adminApi = {
  getStats: () => api.get('/admin/stats'),
  getAuditLogs: (page?: number) => api.get('/admin/audit-logs', { params: { page } }),
  getUsers: () => api.get('/admin/users'),
};

export default api;
