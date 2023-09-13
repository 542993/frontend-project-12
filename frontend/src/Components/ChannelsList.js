import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { setCurrentChannel, selectors } from '../slices/channelsSlice';

const ChannelsList = () => {
  const channels = useSelector(selectors.selectAll);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const dispatch = useDispatch();

  const channelsList = channels.map((channel) => {
    const variant = channel.id === currentChannelId ? 'secondary' : null;

    return (
      <li key={channel.id} className="nav-item w-100">
          <Button
            className="w-100 rounded-0 text-start text-truncate border-0"
            onClick={() => dispatch(setCurrentChannel(channel.id))}
            variant={variant}
          >
            {`# ${channel.name}`}
          </Button>
      </li>
    );
  });
  return channelsList;
};

export default ChannelsList;
