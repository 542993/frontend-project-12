import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './Components/Pages/LoginPage';
import MainPage from './Components/Pages/MainPage';
import NotFoundPage from './Components/Pages/NotFoundPage';
import './App.css';
import { useAuth } from './hooks';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route
        path="/"
        element={(
          <PrivateRoute>
            <MainPage />
          </PrivateRoute>
        )}
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
