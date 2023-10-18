import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const InitOutlet = () => {
  const auth = useAuth();
  return auth.user ? <Outlet /> : <Navigate to={routes.loginPage()} />;
};

export default InitOutlet;
