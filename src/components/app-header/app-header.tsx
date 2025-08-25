import { FC, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { AppHeaderUI } from '@ui';

const PATHS = {
  CONSTRUCTOR: '/',
  FEED: '/feed',
  PROFILE: '/profile'
} as const;

export const AppHeader: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  const userName = user?.name || '';

  const handleNavigate = useCallback(
    (path: string) => () => {
      navigate(path);
    },
    [navigate]
  );

  const isActive = (path: string, exact: boolean = false) =>
    exact ? location.pathname === path : location.pathname.startsWith(path);

  return (
    <AppHeaderUI
      userName={userName}
      onConstructorClick={handleNavigate(PATHS.CONSTRUCTOR)}
      onFeedClick={handleNavigate(PATHS.FEED)}
      onProfileClick={handleNavigate(PATHS.PROFILE)}
      onLogoClick={handleNavigate(PATHS.CONSTRUCTOR)}
      isConstructorActive={isActive(PATHS.CONSTRUCTOR, true)}
      isFeedActive={isActive(PATHS.FEED, true)}
      isProfileActive={isActive(PATHS.PROFILE)}
    />
  );
};
