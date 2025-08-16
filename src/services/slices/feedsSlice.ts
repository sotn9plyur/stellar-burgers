import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '../../utils/types';
import { fetchFeeds } from '../api/feedsApi';

interface FeedsState {
  orders: TOrder[];
  total: number;
  totalToday: number;
  loading: boolean;
  error: string | null;
}

const initialState: FeedsState = {
  orders: [],
  total: 0,
  totalToday: 0,
  loading: false,
  error: null
};

const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {
    updateFeeds: (
      state,
      action: PayloadAction<{
        orders?: TOrder[];
        total?: number;
        totalToday?: number;
        error?: string | null;
      }>
    ) => {
      if (action.payload.orders !== undefined) {
        state.orders = action.payload.orders;
      }
      if (action.payload.total !== undefined) {
        state.total = action.payload.total;
      }
      if (action.payload.totalToday !== undefined) {
        state.totalToday = action.payload.totalToday;
      }
      if (action.payload.error !== undefined) {
        state.error = action.payload.error;
      }
    },
    clearFeeds: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Ошибка загрузки ленты заказов';
      });
  }
});

export const { updateFeeds, clearFeeds } = feedsSlice.actions;
export default feedsSlice.reducer;
