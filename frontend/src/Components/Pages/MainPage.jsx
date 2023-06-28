import { Link, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const MainPage = () => {
  const location = useLocation();
  useEffect(() => {
    const isHasToken = () => {
      const userId = JSON.parse(localStorage.getItem('userId'));
      if (!userId && !userId.token) {
        <Navigate to="/login" state={{ from: location }} />;
      }
      <Navigate to="/" state={{ from: location }} />;
    };
    isHasToken();
  }, []);
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Main Page</Link>
        </li>
        <li>
          <Link to="/login">Login Page</Link>
        </li>
        <li>
          <Link to="/*">Not Found Page</Link>
        </li>
      </ul>
    </div>
  );
};

export default MainPage;
