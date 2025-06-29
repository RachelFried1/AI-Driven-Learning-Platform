import axios from 'axios';
import { authService } from './auth';
import {jwtDecode} from 'jwt-decode';

const API_BASE_URL = 'http://localhost:4000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.request.use(async (config) => {
  let token = authService.getToken();
  if (token) {
    try {
      const decoded: { exp: number } = jwtDecode(token);
      if (decoded.exp * 1000 < Date.now()) {
        if (!isRefreshing) {
          isRefreshing = true;
          try {
            token = await authService.refreshToken();
            processQueue(null, token);
          } catch (err) {
            processQueue(err, null);
            authService.logout();
            window.location.href = '/login';
            return Promise.reject(new Error('Token refresh failed'));
          } finally {
            isRefreshing = false;
          }
        }

        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (newToken: string) => {
              config.headers.Authorization = `Bearer ${newToken}`;
              resolve(config);
            },
            reject: (err: any) => {
              reject(err);
            }
          });
        });
      }
    } catch {
      authService.logout();
      window.location.href = '/login';
      return Promise.reject(new Error('Invalid token'));
    }
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      !originalRequest.url.includes('/auth/login') &&
      !originalRequest.url.includes('/auth/register')
    ) {
      authService.logout();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;