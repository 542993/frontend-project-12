import { Provider as StoreProvider } from 'react-redux';
import io from 'socket.io-client';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import App from './App';
import store from './slices';
import { ChatApiProvider } from './context/chatApiProvider';
import AuthProvider from './context/authProvider';
import { addChannel, renameChannel, removeChannel } from './slices/channelsSlice';
import { addMessage } from './slices/messagesSlice';
import resources from './locales/index.js';

const init = async () => {
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

  return (
    <AuthProvider>
      <I18nextProvider i18n={i18n}>
        <StoreProvider store={store}>
            <ChatApiProvider socket={socket}>
                <App />
            </ChatApiProvider>
        </StoreProvider>
      </I18nextProvider>
    </AuthProvider>
  );
};

export default init;
