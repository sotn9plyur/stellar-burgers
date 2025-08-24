import ingredientsReducer from '../ingredientsSlice';
import { fetchIngredients } from '../../api/ingredientsApi';
import { mockIngridientsData } from './Mock';

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

jest.mock('../api/ingredientsApi', () => ({
  fetchIngredients: {
    pending: (arg: string) => ({
      type: 'fetchIngredients/pending',
      meta: { arg }
    }),
    fulfilled: (payload: any, arg: string) => ({
      type: 'fetchIngredients/fulfilled',
      payload,
      meta: { arg }
    }),
    rejected: (error: any, arg: string) => ({
      type: 'fetchIngredients/rejected',
      error,
      meta: { arg }
    })
  }
}));

describe('ingredientsSlice tests', () => {
  test('fetchIngredients.pending', () => {
    const state = ingredientsReducer(
      initialState,
      fetchIngredients.pending('')
    );
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('fetchIngredients.rejected', () => {
    const error = 'error';
    const state = ingredientsReducer(
      initialState,
      fetchIngredients.rejected(new Error(error), '')
    );
    expect(state.loading).toBe(false);
    expect(state.error).toBe(error);
  });

  test('fetchIngredients.fulfilled', () => {
    const state = ingredientsReducer(
      initialState,
      fetchIngredients.fulfilled(mockIngridientsData, '')
    );
    expect(state.loading).toBe(false);
    expect(state.ingredients).toEqual(mockIngridientsData);
    expect(state.error).toBeNull();
  });
});
