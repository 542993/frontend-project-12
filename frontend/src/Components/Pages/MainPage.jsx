import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Header from '../Header';
import ChannelsPanel from '../ChannelsPanel';
import MessagesPanel from '../MessagesPannel';
import ModalContainer from '../../modal/ModalContainer';
import getAuthHeader from '../../utils';
import routesAPI from '../../routes';
import { setChannels, setCurrentChannel } from '../../slices/channelsSlice';
import { setMessages } from '../../slices/messagesSlice';
import useAuthContext from '../../hooks/useAuthContext';

const MainPage = () => {
  const dispatch = useDispatch();
  const { logOut } = useAuthContext();
  const activeModal = useSelector((state) => state.modals.type);
  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await axios.get(routesAPI.dataPath(), { headers: getAuthHeader() });
        const { currentChannelId, channels, messages } = data;
        dispatch(setChannels(channels));
        dispatch(setCurrentChannel(currentChannelId));
        dispatch(setMessages(messages));
      } catch (error) {
        if (error.response.status === 401) {
          logOut();
        }
      }
    };
    fetch();
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
