import { FC, useMemo } from 'react';
import { useSelector } from '../../services/store';
import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';

const MAX_ORDERS = 20;
const ORDERS_TO_DISPLAY = 5;

enum OrderStatus {
  Done = 'done',
  Pending = 'pending'
}

const filterOrders = (orders: TOrder[], status: OrderStatus): number[] =>
  orders
    .filter((order) => order.status === status)
    .map((order) => order.number)
    .slice(0, MAX_ORDERS);

const splitOrders = (orders: number[]) => {
  const half = Math.ceil(orders.length / 2);
  return {
    firstHalf: orders.slice(0, half).slice(0, ORDERS_TO_DISPLAY),
    secondHalf: orders.slice(half).slice(0, ORDERS_TO_DISPLAY)
  };
};

export const FeedInfo: FC = () => {
  const { orders, total, totalToday } = useSelector((state) => state.feeds);

  const feedStats = useMemo(
    () => ({ total, totalToday }),
    [total, totalToday]
  );

  const readyOrders = useMemo(
    () => filterOrders(orders, OrderStatus.Done),
    [orders]
  );

  const pendingOrders = useMemo(
    () => filterOrders(orders, OrderStatus.Pending),
    [orders]
  );

  const { readyToShow, pendingToShow } = useMemo(() => {
    if (pendingOrders.length === 0 && readyOrders.length > 0) {
      const { firstHalf, secondHalf } = splitOrders(readyOrders);
      return { readyToShow: secondHalf, pendingToShow: firstHalf };
    }
    return {
      readyToShow: readyOrders.slice(0, ORDERS_TO_DISPLAY),
      pendingToShow: pendingOrders.slice(0, ORDERS_TO_DISPLAY)
    };
  }, [readyOrders, pendingOrders]);

  return (
    <FeedInfoUI
      readyOrders={readyToShow}
      pendingOrders={pendingToShow}
      feed={feedStats}
    />
  );
};