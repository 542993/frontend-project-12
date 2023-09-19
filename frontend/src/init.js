import { Provider as StoreProvider } from 'react-redux';
import io from 'socket.io-client';
import { ChatApiProvider } from './context/chatApiProvider';
import AuthProvider from './context/authProvider';
import App from './App';
import store from './slices';
import { addChannel, renameChannel, removeChannel } from './slices/channelsSlice';
import { addMessage } from './slices/messagesSlice';

const init = async () => {
  const socket = io();
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

  return (
    <AuthProvider>
        <StoreProvider store={store}>
          <ChatApiProvider socket={socket}>
              <App />
          </ChatApiProvider>
        </StoreProvider>
    </AuthProvider>
  );
};

export default init;
