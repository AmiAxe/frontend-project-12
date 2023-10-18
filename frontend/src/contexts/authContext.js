import {
  createContext, useState, useMemo, useCallback,
} from 'react';

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => localStorage.getItem('user'));

  const logIn = useCallback((resData) => {
    localStorage.setItem('user', resData);
    setUser(resData);
  }, []);

  const logOut = useCallback(() => {
    localStorage.removeItem('user');
    setUser(null);
  }, []);

  const getAuthHeader = () => {
    if (user && user.token) {
      return { Authorization: `Bearer ${user.token}` };
    }
    return {};
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

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
