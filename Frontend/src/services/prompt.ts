import api from './api';
import { Category, Subcategory, PromptSubmission, PromptHistory } from '../types';

export const promptService = {
  async getCategories(): Promise<Category[]> {
    const response = await api.get('/categories');
    return response.data;
  },

  async getSubcategories(categoryId: string | number): Promise<Subcategory[]> {
    const response = await api.get(`/subcategories/category/${categoryId}`);
    return response.data;
  },

  async submitPrompt(submission: PromptSubmission) {
    const response = await api.post('/prompts', submission);
    return response.data;
  },

  async getUserPrompts(params?: {
    page?: number;
    limit?: number;
    search?: string;
    categoryId?: string;
    subCategoryId?: string;
    date?: string;
    tzOffset?: number;
  }) {
    const response = await api.get('/prompts/my', { params });
    return response.data;
  },

  async getUserHistory(params: {
    page: number;
    limit: number;
    search: string;
    categoryId: string;
    subCategoryId: string;
    date?: string;
    tzOffset?: number;
  }): Promise<{ items: PromptHistory[]; totalPages: number; totalItems: number }> {
    const query = new URLSearchParams({
      page: params.page.toString(),
      limit: params.limit.toString(),
      search: params.search,
      categoryId: params.categoryId,
      subCategoryId: params.subCategoryId,
      ...(params.date ? { date: params.date } : {}),
      ...(params.tzOffset !== undefined ? { tzOffset: params.tzOffset.toString() } : {}),
    }).toString();

    const response = await api.get(`/prompts/my?${query}`);
    return response.data;
  },

  async getAllPrompts(params: {
    page?: number;
    limit?: number;
    userId?: string;
    categoryId?: string;
    subCategoryId?: string;
    search?: string;
    date?: string;
    tzOffset?: number;
  }): Promise<{ items: PromptHistory[]; totalPages: number; totalItems: number }> {
    const response = await api.get('/prompts/all', { params });
    return response.data;
  }
};