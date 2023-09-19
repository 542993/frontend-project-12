import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { useAuth } from '../hooks/index';

const Header = () => {
  const { user, logOut } = useAuth();

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <Link className="navbar-brand" to="/">Hexlet chat</Link>
        { user && <Button onClick={logOut}>Выйти</Button> }
      </div>
    </nav>
  );
};

export default Header;
