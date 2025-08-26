import { rootReducer } from '../../store';

describe('rootReducer', () => {
  test('should return the initial state for unknown action', () => {
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    
    // Проверяем, что для неизвестного действия возвращается объект с нужными ключами
    expect(initialState).toHaveProperty('ingredients');
    expect(initialState).toHaveProperty('auth');
    expect(initialState).toHaveProperty('constructor');
    expect(initialState).toHaveProperty('orders');
    expect(initialState).toHaveProperty('feeds');
    expect(initialState).toHaveProperty('profileOrders');
    
    // Проверяем, что все свойства являются объектами (не функциями), кроме constructor
    expect(typeof initialState.ingredients).toBe('object');
    expect(typeof initialState.auth).toBe('object');
    expect(typeof initialState.orders).toBe('object');
    expect(typeof initialState.feeds).toBe('object');
    expect(typeof initialState.profileOrders).toBe('object');
  });

  test('should handle RESET_STORE action', () => {
    const currentState = {
      ingredients: { someData: 'test' },
      auth: { user: 'test' },
      constructor: { 
        bun: { id: 'test', price: 100 },
        ingredients: [{ id: 'test', price: 50 }],
        totalPrice: 250
      },
      orders: { currentOrder: null },
      feeds: { orders: [] },
      profileOrders: { orders: [] }
    };

    const newState = rootReducer(currentState, { type: 'RESET_STORE' });
    
    // Проверяем, что состояние сбрасывается к начальному
    expect(newState).toHaveProperty('ingredients');
    expect(newState).toHaveProperty('auth');
    expect(newState).toHaveProperty('constructor');
    expect(newState).toHaveProperty('orders');
    expect(newState).toHaveProperty('feeds');
    expect(newState).toHaveProperty('profileOrders');
    
    // Убеждаемся, что это не то же самое состояние
    expect(newState).not.toEqual(currentState);
  });
});
