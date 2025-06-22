import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { userService } from '../../services/user';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

interface UsersState {
  items: User[];
  total: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;
  page: number;
  limit: number;
  search: string;
}

const initialState: UsersState = {
  items: [],
  total: 0,
  totalPages: 1,
  isLoading: false,
  error: null,
  page: 1,
  limit: 10,
  search: '',
};

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async ({ page, limit, search }: { page: number; limit: number; search: string }, thunkAPI) => {
    const res = await userService.getAllUsers({ page, limit, search });
    return res;
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setLimit(state, action: PayloadAction<number>) {
      state.limit = action.payload;
    },

    resetUsersState(state) {
      state.items = [];
      state.total = 0;
      state.totalPages = 1;
      state.isLoading = false;
      state.error = null;
      state.page = 1;
      state.limit = 10;
      state.search = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.items;
        state.total = action.payload.total;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch users';
      });
  },
});

export const { setPage, setSearch, setLimit, resetUsersState } = usersSlice.actions;
export default usersSlice.reducer;