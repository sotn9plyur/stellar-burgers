import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation
} from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from '../../services/store';
import { getUser } from '../../services/api/authApi';
import { setAuthChecked } from '../../services/slices/authSlice';
import { fetchIngredients } from '../../services/api/ingredientsApi';
import { getCookie } from '../../utils/cookie';
import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404,
  IngredientPage,
  OrderPage
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { AppHeader, Modal, IngredientDetails, OrderInfo } from '@components';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

const AppRoutes = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const background = location.state?.background;

  useEffect(() => {
    dispatch(fetchIngredients());

    const accessToken = getCookie('accessToken');
    accessToken ? dispatch(getUser()) : dispatch(setAuthChecked(true));
  }, [dispatch]);

  const handleCloseModal = () => navigate(-1);

  const routes = [
    { path: '/', element: <ConstructorPage /> },
    { path: '/feed', element: <Feed /> },
    {
      path: '/login',
      element: (
        <ProtectedRoute onlyUnAuth>
          <Login />
        </ProtectedRoute>
      )
    },
    {
      path: '/register',
      element: (
        <ProtectedRoute onlyUnAuth>
          <Register />
        </ProtectedRoute>
      )
    },
    {
      path: '/forgot-password',
      element: (
        <ProtectedRoute onlyUnAuth>
          <ForgotPassword />
        </ProtectedRoute>
      )
    },
    {
      path: '/reset-password',
      element: (
        <ProtectedRoute onlyUnAuth>
          <ResetPassword />
        </ProtectedRoute>
      )
    },
    {
      path: '/profile',
      element: (
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      )
    },
    {
      path: '/profile/orders',
      element: (
        <ProtectedRoute>
          <ProfileOrders />
        </ProtectedRoute>
      )
    },
    { path: '/ingredients/:id', element: <IngredientPage /> },
    { path: '/feed/:number', element: <OrderPage /> },
    {
      path: '/profile/orders/:number',
      element: (
        <ProtectedRoute>
          <OrderPage />
        </ProtectedRoute>
      )
    },
    { path: '*', element: <NotFound404 /> }
  ];

  const modalRoutes = [
    {
      path: '/ingredients/:id',
      element: (
        <Modal title='Детали ингредиента' onClose={handleCloseModal}>
          <IngredientDetails />
        </Modal>
      )
    },
    {
      path: '/feed/:number',
      element: (
        <Modal title='Информация о заказе' onClose={handleCloseModal}>
          <OrderInfo />
        </Modal>
      )
    },
    {
      path: '/profile/orders/:number',
      element: (
        <ProtectedRoute>
          <Modal title='Информация о заказе' onClose={handleCloseModal}>
            <OrderInfo />
          </Modal>
        </ProtectedRoute>
      )
    }
  ];

  return (
    <>
      <AppHeader />
      <Routes location={background || location}>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>

      {background && (
        <Routes>
          {modalRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      )}
    </>
  );
};

const App = () => (
  <div className={styles.app}>
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <AppRoutes />
    </BrowserRouter>
  </div>
);

export default App;
