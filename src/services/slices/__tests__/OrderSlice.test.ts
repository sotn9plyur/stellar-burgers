import { createOrder, getOrderByNumber } from '../../api/ordersApi';
import { ordersSlice } from '../ordersSlice';
import {
  mockOrderIds,
  mockOrderNumber,
  mockCreateOrderResponce,
  mockOrderResponce,
  mockUserOrders
} from './Mock';

jest.mock('@api', () => ({
  orderBurgerApi: jest.fn()
}));

jest.mock('@api', () => ({
  getOrderByNumberApi: jest.fn()
}));

jest.mock('@api', () => ({
  getOrdersApi: jest.fn()
}));

const initiallState = {
  currentOrder: null,
  orderDetails: null,
  loading: false,
  error: null
};

describe('OrderSlice test', () => {
  test('createOrder.pending', () => {
    const state = ordersSlice.reducer(
      initiallState,
      createOrder.pending('', mockOrderIds)
    );

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('createOrder.rejected', () => {
    const error = 'error';
    const state = ordersSlice.reducer(
      initiallState,
      createOrder.rejected(new Error(error), '', mockOrderIds)
    );

    expect(state.loading).toBe(false);
    expect(state.error).toBe(error);
  });

  test('createOrder.fulfilled', () => {
    const state = ordersSlice.reducer(
      initiallState,
      createOrder.fulfilled(mockCreateOrderResponce.order, '', mockOrderIds)
    );

    expect(state.loading).toBe(false);
    expect(state.currentOrder).toEqual(mockCreateOrderResponce.order);
    expect(state.error).toBeNull();
  });

  test('getOrderByNumber.pending', () => {
    const state = ordersSlice.reducer(
      initiallState,
      getOrderByNumber.pending('', mockOrderNumber)
    );

    expect(state.loading).toBe(true);
    expect(state.orderDetails).toBeNull();
    expect(state.error).toBeNull();
  });

  test('getOrderByNumber.rejected', () => {
    const error = 'error';
    const state = ordersSlice.reducer(
      initiallState,
      getOrderByNumber.rejected(new Error(error), '', mockOrderNumber)
    );

    expect(state.loading).toBe(false);
    expect(state.orderDetails).toBeNull();
    expect(state.error).toBe(error);
  });

  test('getOrderByNumber.fulfilled', () => {
    const state = ordersSlice.reducer(
      initiallState,
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
