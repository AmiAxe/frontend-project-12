import {
  createContext, useState, useMemo,
} from 'react';

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => localStorage.getItem('user'));

  const logIn = (resData) => {
    localStorage.setItem('user', resData);
    setUser(resData);
  };

  const logOut = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const getAuthHeader = () => {
    return user?.token ? { Authorization: `Bearer ${user.token}` } : {};
  };

  const memoValue = useMemo(
    () => ({
      logIn, logOut, user, getAuthHeader,
    }),
    [logIn, logOut, user, getAuthHeader],
  );

  return (
    <AuthContext.Provider value={memoValue}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
