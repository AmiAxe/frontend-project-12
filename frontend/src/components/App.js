/* eslint-disable react/jsx-no-constructed-context-values */
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RegistrationForm from './forms/RegistrationForm';
import AuthorisationForm from './forms/AuthorisationForm';
import Chat from './chat/Chat';
import PrivateRoute from './PrivateRoute';
import Navigation from './Navigation';
import Page404 from './Page404';
import { AuthProvider } from '../contexts/authContext';
import routes from '../routes';

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <div className="d-flex flex-column h-100">
        <Navigation />
        <Routes>
          <Route path={routes.mainPage()} element={<PrivateRoute> />}>
            <Route path="" element={<Chat />} />
          </Route>
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
