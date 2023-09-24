import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import { useAuth } from '../hooks/index';

const Header = () => {
  const { t } = useTranslation();
  const { user, logOut } = useAuth();
  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <Link className="navbar-brand" to="/">{t('header.title')}</Link>
        { user && <Button onClick={logOut}>{t('header.logOutButton')}</Button> }
      </div>
    </nav>
  );
};

export default Header;
