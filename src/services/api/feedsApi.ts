import { createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi } from '../../utils/burger-api';
import { TOrder } from '../../utils/types';

export type TFeedsResponse = {
  orders: TOrder[];
  total: number;
  totalToday: number;
};

export const fetchFeeds = createAsyncThunk<
  TFeedsResponse,
  void,
  { rejectValue: string }
>('feeds/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const response = await getFeedsApi();
    return {
      orders: response.orders,
      total: response.total,
      totalToday: response.totalToday
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Ошибка загрузки ленты заказов';
    return rejectWithValue(errorMessage);
  }
});
