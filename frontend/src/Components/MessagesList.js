import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { selectors } from '../slices/channelsSlice';

const MessagesList = ({ messages }) => {
  const { t } = useTranslation();
  const channels = useSelector(selectors.selectAll);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const currentChannel = channels.find((channel) => channel.id === currentChannelId);
  const header = currentChannel ? currentChannel.name : '';

  console.log('currentChannelId', currentChannelId);
  const renderMessages = () => {
    if (!messages.length) return '';
    return messages.map((item) => (
      <div key={item.id} className="text-break">
        <b>{`${item.username}:`}</b>
        {` ${item.body}`}
      </div>
    ));
  };

  return (
    <>
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>{`# ${header}`}</b>
        </p>
        <span className="text-muted">
          { t('messagesCount.msg', { count: messages.length }) }
        </span>
      </div>
      <div id="messages-box" className="chat-messages overflow-auto px-5 ">
        {renderMessages()}
      </div>
    </>
  );
};

export default MessagesList;
