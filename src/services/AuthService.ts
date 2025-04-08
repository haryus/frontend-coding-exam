// services/AuthService.ts
import axios from 'axios';
import { useAuthStore } from '../stores/auth';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (user) {
      config.headers['X-User'] = user;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

const AuthService = {
  login: async (form: { email: string; password: string }) => {
    const response = await api.post('/login', form);
    const { access_token, user } = response.data;

    localStorage.setItem('token', access_token);
    localStorage.setItem('user', JSON.stringify(user));

    const authStore = useAuthStore();
    authStore.setAuth(user, access_token);

    return response;
  },

  logout: async () => {
    await api.post('/logout');
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    const authStore = useAuthStore();
    authStore.clearAuth();
  },

  getUser: async () => {
    return api.get('/users');
  },
};

export default AuthService;
