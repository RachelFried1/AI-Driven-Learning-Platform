import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { authService } from '@/services/auth';

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }, thunkAPI) => {
    try {
      return await authService.login({ email, password });
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message ||
        (error?.response?.status === 401 ? 'Invalid email or password.' : 'Login failed')
      );
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (
    data: { name: string; email: string; phone: string; password: string },
    thunkAPI
  ) => {
    try {
      return await authService.register(data);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || 'Registration failed'
      );
    }
  }
);

const getInitialAuthState = () => {
  const user = localStorage.getItem('user');
  const token = localStorage.getItem('token');
  return {
    user: user ? JSON.parse(user) : null,
    isAuthenticated: !!user && !!token,
    loading: false,
    error: null as string | null,
  };
};

const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialAuthState(),
  reducers: {
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('currentLesson');
      localStorage.removeItem('generatedPrompt');
      localStorage.removeItem('selectedCategory');
      localStorage.removeItem('selectedSubcategory');
    },
    clearError(state) {
      state.error = null;
    },
    setUser(state, action: PayloadAction<{ user: any; token: string }>) {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('token', action.payload.token);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.loading = false;
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error.message || 'Login failed';
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.loading = false;
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error.message || 'Registration failed';
      });
  },
});

export const { logout, clearError, setUser } = authSlice.actions;
export default authSlice.reducer;
export { authSlice };