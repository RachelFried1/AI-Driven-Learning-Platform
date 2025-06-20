import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { User, AuthState, LoginCredentials, RegisterData } from '../types';
import { authService } from '../services/auth';
import { toast } from '@/hooks/use-toast';
import { isJwtExpired } from '@/lib/utils';
import { userService } from '../services/user';


interface AuthContextType extends AuthState {
  isAdmin: boolean;
  login: (credentials: LoginCredentials) => Promise<{ user: User }>;
  register: (data: RegisterData) => Promise<{ user: User }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_USER'; payload: { user: User; token: string } }
  | { type: 'LOGOUT' };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_USER':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
      };
    case 'LOGOUT':
      return {
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      };
    default:
      return state;
  }
};

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const initAuth = async () => {
      const token = authService.getToken();
      if (token && !isJwtExpired(token)) {
        try {
          const user = await userService.getCurrentUser();
          dispatch({ type: 'SET_USER', payload: { user, token } });
        } catch (error) {
          authService.logout();
          dispatch({ type: 'LOGOUT' });
        }
      } else {
        authService.logout();
        dispatch({ type: 'LOGOUT' });
      }
    };

    initAuth();
  }, []);

  const login = async (credentials: LoginCredentials): Promise<{ user: User }> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const { user, token } = await authService.login(credentials);
      dispatch({ type: 'SET_USER', payload: { user, token } });
      toast({
        title: "Welcome back!",
        description: `Hello ${user.name}`,
      });
      return { user };
    } catch (error: any) {
      dispatch({ type: 'SET_LOADING', payload: false });
      toast({
        title: "Login failed",
        description: error.response?.data?.message || "Invalid credentials",
        variant: "destructive",
      });
      throw error;
    }
  };

  const register = async (data: RegisterData): Promise<{ user: User }> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const { user, token } = await authService.register(data);
      dispatch({ type: 'SET_USER', payload: { user, token } });
      toast({
        title: "Account created!",
        description: `Welcome ${user.name}`,
      });
      return { user };
    } catch (error: any) {
      dispatch({ type: 'SET_LOADING', payload: false });
      toast({
        title: "Registration failed",
        description: error.response?.data?.message || "Please try again",
        variant: "destructive",
      });
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    dispatch({ type: 'LOGOUT' });
    toast({
      title: "Logged out",
      description: "See you next time!",
    });
  };

  // Changed from isAdmin to role === 'admin'
  const isAdmin = state.user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ ...state, isAdmin, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};