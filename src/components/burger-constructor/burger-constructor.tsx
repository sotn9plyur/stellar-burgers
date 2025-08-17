import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from '../../services/store';
import { createOrder } from '../../services/api/ordersApi';
import { clearConstructor } from '../../services/slices/constructorSlice';
import { clearOrder } from '../../services/slices/ordersSlice';
import { BurgerConstructorUI } from '@ui';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { bun, ingredients, totalPrice } = useSelector(
    (state) => state.constructor
  );
  const { currentOrder, loading: orderRequest } = useSelector(
    (state) => state.orders
  );
  const { isAuthenticated } = useSelector((state) => state.auth);

  const constructorItems = useMemo(
    () => ({
      bun,
      ingredients: ingredients || []
    }),
    [bun, ingredients]
  );

  const onOrderClick = () => {
    if (!bun || orderRequest) return;

    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const ingredientIds = [
      bun._id,
      ...(ingredients?.map((item) => item._id) || []),
      bun._id
    ];

    dispatch(createOrder(ingredientIds))
      .unwrap()
      .then(() => {
        dispatch(clearConstructor());
      });
  };

  const closeOrderModal = () => {
    dispatch(clearOrder());
  };

  const price = useMemo(() => totalPrice || 0, [totalPrice]);

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={currentOrder}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
