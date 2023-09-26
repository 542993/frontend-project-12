import { Provider as StoreProvider } from 'react-redux';
import io from 'socket.io-client';
import i18next from 'i18next';
import filter from 'leo-profanity';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import App from './App';
import store from './slices';
import RollbarProvider from './Components/RollbarProvider';
import { ChatApiProvider } from './context/chatApiProvider';
import AuthProvider from './context/authProvider';
import { addChannel, renameChannel, removeChannel } from './slices/channelsSlice';
import { addMessage } from './slices/messagesSlice';
import resources from './locales/index.js';

const init = async () => {
  filter.loadDictionary('ru');
  const socket = io();
  const i18n = i18next.createInstance();
  socket.on('newMessage', (message) => {
    console.log('newMessage', message);
    store.dispatch(addMessage(message));
  });
  socket.on('newChannel', (channel) => {
    store.dispatch(addChannel(channel));
  });
  socket.on('removeChannel', ({ id }) => {
    store.dispatch(removeChannel(id));
  });
  socket.on('renameChannel', (updatedChannel) => {
    store.dispatch(renameChannel(updatedChannel));
  });

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
      interpolation: {
        escapeValue: false,
      },
    });
  function TestError() {
    return a;
  }

  return (
    <AuthProvider>
      <I18nextProvider i18n={i18n}>
        <StoreProvider store={store}>
            <ChatApiProvider socket={socket}>
              <RollbarProvider>
                <App />
                <TestError />
                <ToastContainer />
              </RollbarProvider>
            </ChatApiProvider>
        </StoreProvider>
      </I18nextProvider>
    </AuthProvider>
  );
};

export default init;
