import { configureStore } from '@reduxjs/toolkit';
import filtersReducer from '../features/filters/filtersSlice';
import usersReducer from '../features/users/usersSlice';
import promptsReducer from '../features/prompts/promptsSlice';
import historyReducer from '../features/history/historySlice';
import categoriesReducer from '../features/categories/categoriesSlice'
import authReducer from '@/features/auth/authSlice';
 

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    users: usersReducer,
    prompts: promptsReducer,
    history: historyReducer,
    categories: categoriesReducer,
    auth: authReducer,

  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;