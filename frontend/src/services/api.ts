import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';  // Update for production

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add JWT token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const authAPI = {
  register: (data: { name: string; email: string; password: string; role: string }) =>
    api.post('/auth/register', data),
  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
};

export const wellnessAPI = {
  getLogs: () => api.get('/wellness/logs'),
  addLog: (data: Partial<WellnessLog>) => api.post('/wellness/log', data),
  getReminders: () => api.get('/wellness/reminders'),
  addReminder: (data: Partial<Reminder>) => api.post('/wellness/reminder', data),
};

export const bookingAPI = {
  getBookings: () => api.get('/bookings'),
  createBooking: (data: { doctorId: string; category: string; date: string; time: string }) =>
    api.post('/bookings', data),
  confirmBooking: (id: string) => api.put(`/bookings/${id}/confirm`),
  getDoctorsByCategory: (category: string) => api.get(`/bookings/doctors/${category}`),
};

export const userAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data: Partial<User>) => api.put('/users/profile', data),
};

export default api;