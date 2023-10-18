import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const initOutlet = () => {
  const auth = useAuth();
  return auth.user ? <Outlet /> : <Navigate to="/login" />;
  return auth.user ? <Outlet /> : <Navigate to={routes.loginPage()} />;
};

export default initOutlet;
