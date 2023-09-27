import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../slices/channelsSlice';
import Header from '../Header';
import ChannelsPanel from '../ChannelsPanel';
import MessagesPanel from '../MessagesPannel';
import ModalContainer from '../../modal/ModalContainer';

const MainPage = () => {
  const dispatch = useDispatch();
  const activeModal = useSelector((state) => state.modals.activeModal);
  useEffect(() => {
    dispatch(fetchData());
  /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

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
