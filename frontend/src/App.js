import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import LoginPage from './Components/Pages/LoginPage';
import MainPage from './Components/Pages/MainPage';
import NotFoundPage from './Components/Pages/NotFoundPage';
import SignUp from './Components/Pages/SignUp';
import './App.css';
import { routesApp } from './routes';
import useAuthContext from './hooks/useAuthContext';

const PrivateRoute = ({ children }) => {
  const { user } = useAuthContext();
  return user ? children : <Navigate to={routesApp.loginPage} />;
};

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route
        path={routesApp.homePage}
        element={(
          <PrivateRoute>
            <MainPage />
          </PrivateRoute>
        )}
      />
      <Route path={routesApp.loginPage} element={<LoginPage />} />
      <Route path={routesApp.notFoundPag} element={<NotFoundPage />} />
      <Route path={routesApp.signupPage} element={<SignUp />} />
    </Routes>
  </BrowserRouter>
);

export default App;
