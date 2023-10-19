import { useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const AuthRoute = ({ children }) => {
  const { user } = useAuth();

  const location = useLocation();
  if (user && user.token) {
    return children;
  }

  return children
};

export default AuthRoute;
