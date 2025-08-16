import { FC, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from '../../services/store';
import { getOrderByNumber } from '../../services/api/ordersApi';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';

type TIngredientsWithCount = Record<string, TIngredient & { count: number }>;

export const OrderInfo: FC = () => {
  const { number } = useParams<{ number: string }>();
  const dispatch = useDispatch();

  const { orderDetails, loading } = useSelector((state) => state.orders);
  const { ingredients } = useSelector((state) => state.ingredients);

  useEffect(() => {
    if (!number) return;
    dispatch(getOrderByNumber(Number(number)));
  }, [dispatch, number]);

  const orderInfo = useMemo(() => {
    if (!orderDetails || !ingredients.length) return null;

    const date = new Date(orderDetails.createdAt);

    const ingredientsInfo =
      orderDetails.ingredients.reduce<TIngredientsWithCount>((acc, itemId) => {
        const existingIngredient = acc[itemId];
        const ingredient = ingredients.find((ing) => ing._id === itemId);

        if (!ingredient) return acc;

        return {
          ...acc,
          [itemId]: {
            ...ingredient,
            count: existingIngredient ? existingIngredient.count + 1 : 1
          }
        };
      }, {});

    const total = Object.values(ingredientsInfo).reduce(
      (sum, { price, count }) => sum + price * count,
      0
    );

    return {
      ...orderDetails,
      ingredientsInfo,
      date,
      total
    };
  }, [orderDetails, ingredients]);

  if (loading || !orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
