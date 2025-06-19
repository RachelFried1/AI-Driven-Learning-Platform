
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  isAdmin: boolean;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
}

export interface Subcategory {
  id: string;
  categoryId: string;
  name: string;
  description: string;
}

export interface PromptSubmission {
  categoryId: string;
  subCategoryId: string;
  prompt: string;
  ageGroup?: string;
  stage?: string;
  reviewBasics?: boolean;
  includeSummary?: boolean;
  includeQuestions?: boolean;
  includeFollowUp?: boolean;
}

export interface PromptHistory {
  id: string;
  prompt: string;
  response: string;
  category: string;
  subcategory: string;
  createdAt: string;
  userId: string;
  userName?: string;
}

export interface GuidanceQuestion {
  id: string;
  question: string;
  type: 'select' | 'boolean' | 'text';
  options?: string[];
  required?: boolean;
}
