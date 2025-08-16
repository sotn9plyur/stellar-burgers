import { createAsyncThunk } from '@reduxjs/toolkit';
import { orderBurgerApi, getOrderByNumberApi } from '../../utils/burger-api';
import { TOrder } from '../../utils/types';

export const createOrder = createAsyncThunk<
  TOrder,
  string[],
  { rejectValue: string }
>('order/create', async (ingredientIds, { rejectWithValue }) => {
  try {
    const { order } = await orderBurgerApi(ingredientIds);
    if (!order) throw new Error('Не удалось создать заказ');
    return order;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Ошибка создания заказа'
    );
  }
});

export const getOrderByNumber = createAsyncThunk<
  TOrder,
  number,
  { rejectValue: string }
>('order/getByNumber', async (orderNumber, { rejectWithValue }) => {
  try {
    const { orders } = await getOrderByNumberApi(orderNumber);
    if (!orders?.length) throw new Error('Заказ не найден');
    return orders[0];
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Ошибка получения заказа'
    );
  }
});
