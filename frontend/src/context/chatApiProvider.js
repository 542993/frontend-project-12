import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ChatApiContext } from '.';

export const ChatApiProvider = ({ socket, children }) => {
  const checkStatus = (response, callback) => {
    if (response.status === 'ok') {
      callback(response);
    }
  };
  const { t } = useTranslation();
  const chatAPI = useMemo(() => ({
    addMessage: (msg, handleResponse) => {
      socket.timeout(5000).emit('newMessage', msg, (err, response) => {
        if (err) {
          console.log(`${t('notice.netWorkError')}: ${err}`);
        } else {
          checkStatus(response, handleResponse);
        }
      });
    },
    addChannel: (data, handleResponse) => {
      socket.timeout(5000).emit('newChannel', data, (err, response) => {
        if (err) {
          console.log(`${t('notice.netWorkError')}: ${err}`);
        } else {
          checkStatus(response, handleResponse);
        }
      });
    },
    renameChannel: (data, handleResponse) => {
      socket.timeout(5000).emit('renameChannel', data, (err, response) => {
        if (err) {
          console.log(`${t('notice.netWorkError')}: ${err}`);
        } else {
          checkStatus(response, handleResponse);
        }
      });
    },
    removeChannel: (data, handleResponse) => {
      socket.timeout(5000).emit('removeChannel', data, (err, response) => {
        if (err) {
          console.log(`${t('notice.netWorkError')}: ${err}`);
        } else {
          checkStatus(response, handleResponse);
        }
      });
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
