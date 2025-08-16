import { useEffect, useCallback, FC } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { fetchProfileOrders } from '../../services/slices/profileOrdersSlice';
import { ProfileOrdersUI } from '@ui-pages';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector(
    (state) => state.profileOrders
  );
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleRetry = useCallback(() => {
    dispatch(fetchProfileOrders());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchProfileOrders());
    }
  }, [dispatch, isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <h2>Необходима авторизация</h2>
        <p>Для просмотра заказов войдите в систему</p>
      </div>
    );
  }

  if (loading) {
    return <Preloader />;
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <h2>Ошибка загрузки заказов</h2>
        <p>{error}</p>
        <button onClick={handleRetry}>Попробовать еще раз</button>
      </div>
    );
  }

  return <ProfileOrdersUI orders={orders} />;
};
