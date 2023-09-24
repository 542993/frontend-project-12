import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { fetchData } from '../../slices/channelsSlice';
import Header from '../Header';
import ChannelsPanel from '../ChannelsPanel';
import MessagesPanel from '../MessagesPannel';
import ModalContainer from '../../modal/ModalContainer';
import { useAuth } from '../../hooks/index.jsx';

const MainPage = () => {
  const { logOut } = useAuth();  
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const activeModal = useSelector((state) => state.modals.activeModal);
  useEffect(() => {
    dispatch(fetchData());
  /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  if (err) {
    switch (err.code) {
      case 'ERR_NETWORK':
        toast.error(t('notice.netWorkError'));
        throw new Error(`${t('notice.networkError')}: ${err}`);
      case 'ERR_BAD_REQUEST':
        logOut();
        throw new Error(err);
      default:
        toast.error(t('notice.getData'));
        throw new Error(`${t('notice.getData')}: ${err}`);
    }
  }

  return (
    <>
      <div className="d-flex flex-column h-100">
        <Header />
        <div className="container h-100 my-4 overflow-hidden rounded shadow">
          <div className="row h-100 bg-white flex-md-row">
           <ChannelsPanel />
           <MessagesPanel />
          </div>
        </div>
      </div>
      {activeModal && <ModalContainer />}
    </>
  );
};

export default MainPage;
