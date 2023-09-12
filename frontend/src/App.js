import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./Components/Pages/LoginPage";
import MainPage from "./Components/Pages/MainPage";
import NotFoundPage from "./Components/Pages/NotFoundPage";
import "./App.css";
import AuthProvider from "./context/authProvider";

import useAuth from "./hooks";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  console.log("isExist", user);
  console.log("1");
  return user ? children : <Navigate to="/login" />;
};

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <MainPage />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
