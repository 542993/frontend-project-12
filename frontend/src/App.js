import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from './Components/Pages/LoginPage';
import MainPage from './Components/Pages/MainPage';
import NotFoundPage from './Components/Pages/NotFoundPage';
import './App.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/login",
    element: < LoginPage/>,
  },
  {
    path: "/*",
    element: <NotFoundPage />
  },
]);

const App = () => (
  <>
     <RouterProvider router={router} />
  </>
);

export default App;
