import { createOrder, getOrderByNumber } from '../../api/ordersApi';
import { ordersSlice } from '../ordersSlice';
import {
  mockOrderIds,
  mockOrderNumber,
  mockCreateOrderResponce,
  mockOrderResponce
} from '../mockData';

// Объединяем все mocks в один
jest.mock('@api', () => ({
  orderBurgerApi: jest.fn(),
  getOrderByNumberApi: jest.fn(),
  getOrdersApi: jest.fn()
}));

const initialState = {
  currentOrder: null,
  orderDetails: null,
  loading: false,
  error: null
};

describe('OrderSlice test', () => {
  test('createOrder.pending', () => {
    const state = ordersSlice.reducer(
      initialState,
      createOrder.pending('', mockOrderIds)
    );

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('createOrder.rejected', () => {
    const errorMessage = 'Ошибка создания заказа';
    const state = ordersSlice.reducer(
      initialState,
      createOrder.rejected(new Error(errorMessage), '', mockOrderIds)
    );

    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });

  test('createOrder.fulfilled', () => {
    const state = ordersSlice.reducer(
      initialState,
      createOrder.fulfilled(mockCreateOrderResponce.order, '', mockOrderIds)
    );

    expect(state.loading).toBe(false);
    expect(state.currentOrder).toEqual(mockCreateOrderResponce.order);
    expect(state.error).toBeNull();
  });

  test('getOrderByNumber.pending', () => {
    const state = ordersSlice.reducer(
      initialState,
      getOrderByNumber.pending('', mockOrderNumber)
    );

    expect(state.loading).toBe(true);
    expect(state.orderDetails).toBeNull();
    expect(state.error).toBeNull();
  });

  test('getOrderByNumber.rejected', () => {
    const errorMessage = 'Ошибка получения заказа';
    const state = ordersSlice.reducer(
      initialState,
      getOrderByNumber.rejected(new Error(errorMessage), '', mockOrderNumber)
    );

    expect(state.loading).toBe(false);
    expect(state.orderDetails).toBeNull();
    expect(state.error).toBe(errorMessage);
  });

  test('getOrderByNumber.fulfilled', () => {
    const state = ordersSlice.reducer(
      initialState,
      getOrderByNumber.fulfilled(
        mockOrderResponce.orders[0],
        '',
        mockOrderNumber
      )
    );

    expect(state.loading).toBe(false);
    expect(state.orderDetails).toEqual(mockOrderResponce.orders[0]);
  });
});
