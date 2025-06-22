import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { promptService } from '../../services/prompt';
import { PromptHistory } from '../../types';

interface PromptsState {
  items: PromptHistory[];
  total: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;
  page: number;
  limit: number;
  search: string;
  categoryId: string;
  subCategoryId: string;
  date: string;
}

const initialState: PromptsState = {
  items: [],
  total: 0,
  totalPages: 1,
  isLoading: false,
  error: null,
  page: 1,
  limit: 10,
  search: '',
  categoryId: '',
  subCategoryId: '',
  date: '',
};

export const fetchPrompts = createAsyncThunk(
  'prompts/fetchPrompts',
  async (
    { page, limit, search, categoryId, subCategoryId, date }: 
    { page: number; limit: number; search: string; categoryId: string; subCategoryId: string; date: string },
    thunkAPI
  ) => {
    const tzOffset = new Date().getTimezoneOffset();
    const res = await promptService.getAllPrompts({
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

const promptsSlice = createSlice({
  name: 'prompts',
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setCategoryId(state, action: PayloadAction<string>) {
      state.categoryId = action.payload;
      state.subCategoryId = '';
    },
    setSubCategoryId(state, action: PayloadAction<string>) {
      state.subCategoryId = action.payload;
    },
    setDate(state, action: PayloadAction<string>) {
      state.date = action.payload;
    },
    setLimit(state, action: PayloadAction<number>) {
      state.limit = action.payload;
    },
    resetPromptsState(state) {
      state.items = [];
      state.total = 0;
      state.totalPages = 1;
      state.isLoading = false;
      state.error = null;
      state.page = 1;
      state.limit = 10;
      state.search = '';
      state.categoryId = '';
      state.subCategoryId = '';
      state.date = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPrompts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPrompts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.items;
        state.total = action.payload.totalItems;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchPrompts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch prompts';
      });
  },
});

export const {
  setPage,
  setSearch,
  setCategoryId,
  setSubCategoryId,
  setDate,
  setLimit,
  resetPromptsState,
} = promptsSlice.actions;

export default promptsSlice.reducer;

