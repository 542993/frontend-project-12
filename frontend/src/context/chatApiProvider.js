import { useMemo } from 'react';
import { ChatApiContext } from '.';

export const ChatApiProvider = ({ socket, children }) => {
  const checkStatus = (response, callback) => {
    if (response.status === 'ok') {
      callback(response);
    }
  };

  const chatAPI = useMemo(() => ({
    addMessage: (msg, handleResponse) => {
      socket.emit('newMessage', msg, (res) => {
        checkStatus(res, handleResponse);
      });
    },
    addChannel: (data, handleResponse) => {
      socket.emit('newChannel', data, (res) => {
        checkStatus(res, handleResponse);
      });
    },
    renameChannel: (data, handleResponse) => {
      console.log('renameData', data);
      socket.emit('renameChannel', data, (res) => checkStatus(res, handleResponse));
    },
    removeChannel: (data, handleResponse) => {
      socket.emit('removeChannel', data, (res) => checkStatus(res, handleResponse));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }), []);

  return (
    <ChatApiContext.Provider value={chatAPI}>
      {children}
    </ChatApiContext.Provider>
  );
};

export default ChatApiProvider;
