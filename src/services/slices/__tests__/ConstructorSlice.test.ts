import constructorReducer, {
  addIngredient,
  removeIngredient,
  clearConstructor,
  moveIngredient,
  ConstructorState
} from '../constructorSlice';
import { mockBun, mockIngredient, mockSauce } from './Mock';

const initialState: ConstructorState = {
  bun: null,
  ingredients: [],
  totalPrice: 0
};

describe('constructorSlice tests', () => {
  test('add bun', () => {
    const state = constructorReducer(initialState, addIngredient(mockBun));

    expect(state.bun).not.toBeNull();
    expect(state.bun).toMatchObject({
      ...mockBun,
      id: expect.any(String)
    });
    expect(state.totalPrice).toBe(mockBun.price * 2);
  });

  test('add ingredient', () => {
    const state = constructorReducer(
      initialState,
      addIngredient(mockIngredient)
    );

    expect(state.ingredients[0]).toMatchObject({
      ...mockIngredient,
      id: expect.any(String)
    });
    expect(state.totalPrice).toBe(mockIngredient.price);
  });

  test('remove ingredient', () => {
    const stateWithIngredient = {
      ...initialState,
      ingredients: [{ ...mockIngredient, id: 'unique-id-1' }],
      totalPrice: mockIngredient.price
    };

    const state = constructorReducer(
      stateWithIngredient,
      removeIngredient('unique-id-1')
    );

    expect(state.ingredients).toEqual([]);
    expect(state.totalPrice).toBe(0);
  });

  test('move ingredient', () => {
    const stateWithIngredients = {
      ...initialState,
      ingredients: [
        { ...mockIngredient, id: 'id1' },
        { ...mockSauce, id: 'id2' }
      ]
    };

    const state = constructorReducer(
      stateWithIngredients,
      moveIngredient({ fromIndex: 0, toIndex: 1 })
    );

    expect(state.ingredients[0]).toMatchObject({
      ...mockSauce,
      id: 'id2'
    });
    expect(state.ingredients[1]).toMatchObject({
      ...mockIngredient,
      id: 'id1'
    });
  });

  test('clear constructor', () => {
    const filledState = {
      bun: { ...mockBun, id: 'bun1' },
      ingredients: [
        { ...mockIngredient, id: 'id1' },
        { ...mockSauce, id: 'id2' }
      ],
      totalPrice: mockBun.price * 2 + mockIngredient.price + mockSauce.price
    };

    const state = constructorReducer(filledState, clearConstructor());

    expect(state.bun).toBeNull();
    expect(state.ingredients).toEqual([]);
    expect(state.totalPrice).toBe(0);
  });
});
