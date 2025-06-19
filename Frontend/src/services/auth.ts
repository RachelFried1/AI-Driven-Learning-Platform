import api from './api';
import { LoginCredentials, RegisterData, User } from '../types';

const TOKEN_KEY = 'token';
const REFRESH_KEY = 'refreshToken';

export const authService = {
  async login(credentials: LoginCredentials) {
    const response = await api.post('/auth/login', credentials);
    const { token, refreshToken, user } = response.data;
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(REFRESH_KEY, refreshToken);
    return { token, user };
  },

  async register(data: RegisterData) {
    const response = await api.post('/auth/register', data);
    const { token, refreshToken, user } = response.data;
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(REFRESH_KEY, refreshToken);
    return { token, user };
  },

  async getCurrentUser(): Promise<User> {
    const response = await api.get('/auth/user');
    return response.data;
  },

  async refreshToken() {
    const refreshToken = localStorage.getItem(REFRESH_KEY);
    if (!refreshToken) throw new Error('No refresh token');
    const response = await api.post('/auth/refresh', { refreshToken });
    const { token: newToken, refreshToken: newRefreshToken } = response.data;
    localStorage.setItem(TOKEN_KEY, newToken);
    localStorage.setItem(REFRESH_KEY, newRefreshToken);
    return newToken;
  },

  logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_KEY);
  },

  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  getRefreshToken() {
    return localStorage.getItem(REFRESH_KEY);
  }
};