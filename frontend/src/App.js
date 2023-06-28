import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
  import LoginPage from './Components/Pages/LoginPage';
import MainPage from './Components/Pages/MainPage';
import NotFoundPage from './Components/Pages/NotFoundPage';
import './App.css';
import AuthContext from './context/index.jsx';
import useAuth from './hooks';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();
  return (
    auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={(
              <PrivateRoute>
                <MainPage />
              </PrivateRoute>
     )} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
