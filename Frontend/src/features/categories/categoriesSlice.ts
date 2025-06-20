import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { promptService } from '../../services/prompt';
import { Category, Subcategory } from '../../types';

interface CategoriesState {
  categories: Category[];
  subcategories: { [categoryId: string]: Subcategory[] };
  isLoading: boolean;
  error: string | null;
}

const initialState: CategoriesState = {
  categories: [],
  subcategories: {},
  isLoading: false,
  error: null,
};

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    const res = await promptService.getCategories();
    return res;
  }
);

export const fetchSubcategories = createAsyncThunk(
  'categories/fetchSubcategories',
  async (categoryId: string) => {
    const res = await promptService.getSubcategories(categoryId);
    return { categoryId, subcategories: res };
  }
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    resetCategoriesState(state) {
      state.categories = [];
      state.subcategories = {};
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
        state.isLoading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch categories';
      })
      .addCase(fetchSubcategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSubcategories.fulfilled, (state, action: PayloadAction<{ categoryId: string; subcategories: Subcategory[] }>) => {
        state.isLoading = false;
        state.subcategories[action.payload.categoryId] = action.payload.subcategories;
      })
      .addCase(fetchSubcategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch subcategories';
      });
  },
});

export const { resetCategoriesState } = categoriesSlice.actions;
export default categoriesSlice.reducer;