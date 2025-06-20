import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterFields {
  searchTerm: string;
  categoryId: string;
  subCategoryId: string;
  date: string;
}

interface FiltersState {
  admin: FilterFields;
  user: FilterFields;
  history: FilterFields; // <-- Added for HistoryList
}

const initialFields: FilterFields = {
  searchTerm: '',
  categoryId: '',
  subCategoryId: '',
  date: '',
};

const initialState: FiltersState = {
  admin: { ...initialFields },
  user: { ...initialFields },
  history: { ...initialFields }, // <-- Added for HistoryList
};

type FilterKey = keyof FiltersState;

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilterField: (
      state,
      action: PayloadAction<{ key: FilterKey; field: keyof FilterFields; value: string }>
    ) => {
      const { key, field, value } = action.payload;
      // Reset subCategoryId if categoryId changes
      if (field === 'categoryId') {
        state[key].categoryId = value;
        state[key].subCategoryId = '';
      } else {
        state[key][field] = value;
      }
    },
    resetFilters: (state, action: PayloadAction<FilterKey>) => {
      state[action.payload] = { ...initialFields };
    },
  },
});

export const { setFilterField, resetFilters } = filtersSlice.actions;
export type { FilterKey, FilterFields };
export default filtersSlice.reducer;