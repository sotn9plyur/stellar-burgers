import { createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '../../utils/types';
import { fetchIngredients } from '../api/ingredientsApi';

interface IngredientsState {
  ingredients: TIngredient[];
  loading: boolean;
  error: string | null;
  lastFetched: number | null;
}

const initialState: IngredientsState = {
  ingredients: [],
  loading: false,
  error: null,
  lastFetched: null
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    clearIngredientsError: (state) => {
      state.error = null;
    },
    resetIngredients: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
        state.lastFetched = Date.now();
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Ошибка загрузки ингредиентов';
        state.lastFetched = null;
      });
  }
});

export const { clearIngredientsError, resetIngredients } = ingredientsSlice.actions;
export default ingredientsSlice.reducer;