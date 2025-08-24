import feedsReducer, {
  setOrders,
  setTotal,
  setTotalToday,
  setLoading,
  setError,
  clearFeeds
} from '../feedsSlice';
import { fetchFeeds } from '../../api/feedsApi';
import { mockUserOrders } from './Mock';
import { FeedsState } from '../feedsSlice';

const initialState: FeedsState = {
  orders: [],
  total: 0,
  totalToday: 0,
  loading: false,
  error: null
};

describe('feedsSlice tests', () => {
  test('fetchFeeds.pending', () => {
    const state = feedsReducer(initialState, fetchFeeds.pending(''));

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('fetchFeeds.rejected', () => {
    const error = 'error';
    const state = feedsReducer(
      initialState,
      fetchFeeds.rejected(new Error(error), '', undefined)
    );

    expect(state.orders).toEqual([]);
    expect(state.total).toBe(0);
    expect(state.totalToday).toBe(0);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(error);
  });

  test('fetchFeeds.fulfilled', () => {
    const state = feedsReducer(
      initialState,
      fetchFeeds.fulfilled(mockUserOrders, '', undefined)
    );

    expect(state.loading).toBe(false);
    expect(state.orders).toEqual(mockUserOrders.orders);
    expect(state.total).toBe(mockUserOrders.total);
    expect(state.totalToday).toBe(mockUserOrders.totalToday);
    expect(state.error).toBeNull();
  });

  test('setOrders', () => {
    const state = feedsReducer(initialState, setOrders(mockUserOrders.orders));
    expect(state.orders).toEqual(mockUserOrders.orders);
  });

  test('setTotal', () => {
    const state = feedsReducer(initialState, setTotal(mockUserOrders.total));
    expect(state.total).toBe(mockUserOrders.total);
  });

  test('setTotalToday', () => {
    const state = feedsReducer(
      initialState,
      setTotalToday(mockUserOrders.totalToday)
    );
    expect(state.totalToday).toBe(mockUserOrders.totalToday);
  });

  test('setLoading', () => {
    const state = feedsReducer(initialState, setLoading(true));
    expect(state.loading).toBe(true);
  });

  test('setError', () => {
    const state = feedsReducer(initialState, setError('Some error'));
    expect(state.error).toBe('Some error');
  });

  test('clearFeeds', () => {
    const filledState: FeedsState = {
      orders: mockUserOrders.orders,
      total: mockUserOrders.total,
      totalToday: mockUserOrders.totalToday,
      loading: true,
      error: 'error'
    };

    const state = feedsReducer(filledState, clearFeeds());
    expect(state.orders).toEqual([]);
    expect(state.total).toBe(0);
    expect(state.totalToday).toBe(0);
    expect(state.error).toBeNull();
  });
});
