import api from './api';

export const userService = {
  async getAllUsers(params?: { search?: string; page?: number; limit?: number }) {
    const response = await api.get('/users', { params });
    return response.data;
  },
  async getCurrentUser() {
    const response = await api.get('/users/me');
    return response.data;
  },
};