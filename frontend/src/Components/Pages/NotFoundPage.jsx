import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../Header';
import img from '../../assets/notFound.jpg';
import { routesApp } from '../../routes';

const NotFoundPage = () => {
  const { t } = useTranslation();
  return (
    <div className="d-flex flex-column h-100">
      <Header />
      <div className="text-center">
        <img alt={t('notFoundPage.title')} src={img} className="img-fluid" />
        <h1 className="h4 text-muted">{t('notFoundPage.title')}</h1>
        <p className="text-muted">
          <span>{t('notFoundPage.navigateText')}</span>
          <Link className="px-2" to={routesApp.homePage}>{t('notFoundPage.toMainPage')}</Link>
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
