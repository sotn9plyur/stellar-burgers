import ingredientsReducer from '../ingredientsSlice';
import { mockIngridientsData } from '../mockData';

interface IngredientsState {
  ingredients: any[];
  loading: boolean;
  error: string | null;
}

const initialState: IngredientsState = {
  ingredients: [],
  loading: false,
  error: null
};

describe('ingredientsSlice tests', () => {
  test('fetchIngredients.pending', () => {
    const state = ingredientsReducer(initialState, {
      type: 'ingredients/fetchIngredients/pending'
    });
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('fetchIngredients.rejected', () => {
    const errorMessage = 'Ошибка загрузки ингредиентов';
    const state = ingredientsReducer(initialState, {
      type: 'ingredients/fetchIngredients/rejected',
      error: { message: errorMessage }
    });
    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });

  test('fetchIngredients.fulfilled', () => {
    const state = ingredientsReducer(initialState, {
      type: 'ingredients/fetchIngredients/fulfilled',
      payload: mockIngridientsData
    });
    expect(state.loading).toBe(false);
    expect(state.ingredients).toEqual(mockIngridientsData);
    expect(state.error).toBeNull();
  });
});
