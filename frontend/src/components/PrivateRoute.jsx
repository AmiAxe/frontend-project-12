import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const AuthRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.user ? children : <Navigate to={routes.loginPage()} state={{ from: location }} />
  );
};

export default AuthRoute;
