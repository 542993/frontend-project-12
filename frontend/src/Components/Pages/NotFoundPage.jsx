import { Link } from 'react-router-dom';
import Header from '../Header';
import img from '../../assets/notFound.svg';
import { routesApp } from '../../routes';

const NotFoundPage = () => {
  return (
    <div className="d-flex flex-column h-100">
      <Header />
      <div className="text-center">
        <img alt="Страница не найдена" src={img} className="img-fluid h-25" />
        <h1 className="h4 text-muted">Страница не найдена</h1>
        <p className="text-muted">
        Но вы можете перейти
          <Link to={routesApp.homePage}>на главную страницу</Link>
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
