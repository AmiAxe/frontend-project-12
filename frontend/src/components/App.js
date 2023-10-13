/* eslint-disable react/jsx-no-constructed-context-values */
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RegistrationForm from './forms/RegistrationForm';
import AuthorisationForm from './forms/AuthorisationForm';
import Chat from './chat/Chat';
import PrivateRoute from './PrivateRoute';
import Navigation from './Navigation';
import Page404 from './Page404';
import { AuthContext } from '../contexts/index';
import routes from '../routes';

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

  return (
    <AuthContext.Provider value={{
      logIn, logOut, user, getAuthHeader,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <div className="d-flex flex-column h-100">
        <Navigation />
        <Routes>
          <Route
            path={routes.mainPage()}
            element={(
              <PrivateRoute>
                <Chat />
              </PrivateRoute>
            )}
          />
          <Route path={routes.signupPage()} element={<RegistrationForm />} />
          <Route path={routes.loginPage()} element={<AuthorisationForm />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </div>
      <ToastContainer />
    </BrowserRouter>
  </AuthProvider>
);

export default App;
