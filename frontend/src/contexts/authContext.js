import { createContext, useState, useMemo } from 'react';

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')));
  const logIn = (resData) => {
    localStorage.setItem('user', JSON.stringify(resData));
    setUser(resData);
  };
  const logOut = () => {
    localStorage.removeItem('user');
    setUser(null);
  };
  const getAuthHeader = () => {
    if (user && user.token) {
      return { Authorization: `Bearer ${user.token}` };
    }
    return {};
  };

  const memoValue = useMemo(() => ({
      logIn, logOut, user, getAuthHeader,
     });

  return (
    <AuthContext.Provider value={memoValue}}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
