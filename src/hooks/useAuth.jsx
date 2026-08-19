import { useSelector } from 'react-redux';
import { selectUser, selectIsAuthenticated, selectAuthLoading } from '../features/auth/authSelectors';

export const useAuth = () => {
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectAuthLoading);

  return {
    user,
    isAuthenticated,
    loading,
    role: user?.role || null,
  };
};

export default useAuth;
