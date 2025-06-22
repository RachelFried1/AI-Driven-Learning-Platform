import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { promptService } from '../../services/prompt';
import { PromptHistory } from '../../types';

interface HistoryState {
  items: PromptHistory[];
  total: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;
  page: number;
  limit: number;
}

const initialState: HistoryState = {
  items: [],
  total: 0,
  totalPages: 1,
  isLoading: false,
  error: null,
  page: 1,
  limit: 10,
};

export const fetchHistory = createAsyncThunk(
  'history/fetchHistory',
  async (
    { page, limit, search, categoryId, subCategoryId, date }: 
    { page: number; limit: number; search: string; categoryId: string; subCategoryId: string; date: string },
    thunkAPI
  ) => {
    const tzOffset = new Date().getTimezoneOffset();
    const res = await promptService.getUserHistory({
      page,
      limit,
      search,
      categoryId,
      subCategoryId,
      date: date || undefined,
      tzOffset,
    });
    return res;
  }
);

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setLimit(state, action: PayloadAction<number>) {
      state.limit = action.payload;
    },
    resetHistoryState(state) {
      state.items = [];
      state.total = 0;
      state.totalPages = 1;
      state.isLoading = false;
      state.error = null;
      state.page = 1;
      state.limit = 10;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHistory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.items;
        state.total = action.payload.totalItems;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch history';
      });
  },
});

export const { setPage, setLimit, resetHistoryState } = historySlice.actions;
export default historySlice.reducer;