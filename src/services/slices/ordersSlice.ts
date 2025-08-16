import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '../../utils/types';
import { createOrder, getOrderByNumber } from '../api/ordersApi';

interface OrdersState {
  currentOrder: TOrder | null;
  orderDetails: TOrder | null;
  loading: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  currentOrder: null,
  orderDetails: null,
  loading: false,
  error: null
};

const setPending = (state: OrdersState) => {
  state.loading = true;
  state.error = null;
};

const setRejected = (state: OrdersState, action: any, fallback: string) => {
  state.loading = false;
  state.error = action.payload || fallback;
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setCurrentOrder: (state, action: PayloadAction<TOrder | null>) => {
      state.currentOrder = action.payload;
    },
    setOrderDetails: (state, action: PayloadAction<TOrder | null>) => {
      state.orderDetails = action.payload;
    },
    clearOrder: (state) => {
      state.currentOrder = null;
      state.orderDetails = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder

      .addCase(createOrder.pending, setPending)
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) =>
        setRejected(state, action, 'Ошибка создания заказа')
      )

      .addCase(getOrderByNumber.pending, setPending)
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.loading = false;
        state.orderDetails = action.payload;
      })
      .addCase(getOrderByNumber.rejected, (state, action) =>
        setRejected(state, action, 'Ошибка получения заказа')
      );
  }
});

export const { setCurrentOrder, setOrderDetails, clearOrder } =
  ordersSlice.actions;

export default ordersSlice.reducer;
