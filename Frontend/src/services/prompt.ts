import api from './api';
import { Category, Subcategory, PromptSubmission, PromptHistory } from '../types';

export const promptService = {
  async getCategories(): Promise<Category[]> {
    const response = await api.get('/categories');
    return response.data;
  },

  async getSubcategories(categoryId: string|number): Promise<Subcategory[]> {
    const response = await api.get(`/subcategories/category/${categoryId}`);
    return response.data;
  },

  async submitPrompt(submission: PromptSubmission) {
    const response = await api.post('/prompts', submission);
    return response.data;
  },

  async getUserPrompts(params?: { page?: number; limit?: number; search?: string; categoryId?: string; subCategoryId?: string; date?: string }) {
    const response = await api.get('/prompts/my', { params });
    return response.data;
  },
  async getUserHistory(): Promise<PromptHistory[]> {
    const response = await api.get('/prompts/user');
    return response.data;
  },

  // NEW: Get all prompts with filters and pagination
  async getAllPrompts(params: {
    page?: number;
    limit?: number;
    userId?: string;
    categoryId?: string;
    subCategoryId?: string;
    search?: string;
    startDate?: string;
    endDate?: string;
  }): Promise<{ items: PromptHistory[]; totalPages: number; totalItems: number }> {
    const response = await api.get('/prompts/all', { params });
    return response.data;
  }
};