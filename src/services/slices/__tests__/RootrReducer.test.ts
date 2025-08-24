import { combineReducers, configureStore } from '@reduxjs/toolkit';
import constructorSlice from '../constructorSlice';
import feedsSlice from '../feedsSlice';
import ingredientsSlice from '../ingredientsSlice';
import ordersSlice from '../ordersSlice';
import { authSlice } from '../authSlice';

describe('rootReducer', () => {
  test('should return the initial state for unknown action', () => {
    const rootReducer = combineReducers({
      ingredients: ingredientsSlice,
      auth: authSlice.reducer,
      constructor: constructorSlice,
      orders: ordersSlice,
      feeds: feedsSlice
    });

    const store = configureStore({ reducer: rootReducer });

    const initialState = store.getState();

    store.dispatch({ type: 'UNKNOWN_ACTION' });

    expect(store.getState()).toEqual(initialState);
  });
});
