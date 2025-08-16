import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import ingredientsReducer from './slices/ingredientsSlice';
import authReducer from './slices/authSlice';
import constructorReducer from './slices/constructorSlice';
import ordersReducer from './slices/ordersSlice';
import feedsReducer from './slices/feedsSlice';
import profileOrdersReducer from './slices/profileOrdersSlice';

const appReducer = combineReducers({
  ingredients: ingredientsReducer,
  auth: authReducer,
  constructor: constructorReducer,
  orders: ordersReducer,
  feeds: feedsReducer,
  profileOrders: profileOrdersReducer
});

const rootReducer = (state: any, action: any) => {
  if (action.type === 'RESET_STORE') {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export type RootState = ReturnType<typeof appReducer>;
export type AppDispatch = typeof store.dispatch;

const useDispatch = () => dispatchHook<AppDispatch>();
const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export { useDispatch, useSelector };

export const resetStore = () => ({ type: 'RESET_STORE' }) as const;

export default store;
