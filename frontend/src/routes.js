const apiPath = '/api/v1';

const routes = {
  mainPage: () => '/',
  loginPage: () => '/login',
  signupPage: () => '/signup',
  loginPath: () => [apiPath, 'login'].join('/'),
  usersPath: () => [apiPath, 'data'].join('/'),
  signUpPath: () => [apiPath, 'signup'].join('/'),
};

export default routes;
