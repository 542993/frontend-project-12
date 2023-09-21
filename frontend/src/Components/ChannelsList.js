import { useDispatch, useSelector } from 'react-redux';
import { Button, Dropdown, ButtonGroup } from 'react-bootstrap';
import { setCurrentChannel, selectors } from '../slices/channelsSlice';
import { setActiveModal } from '../slices/modalSlice';

const ChannelsList = () => {
  const channels = useSelector(selectors.selectAll);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const dispatch = useDispatch();

  const channelsList = channels.map((channel) => {
    const variant = channel.id === currentChannelId ? 'secondary' : null;
    const dropDownButton = (
      <>
        <Dropdown.Toggle split variant={variant} id="dropdown-split-basic" />
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => dispatch(setActiveModal({ type: 'delete' }))}>Удалить</Dropdown.Item>
          <Dropdown.Item onClick={() => dispatch(setActiveModal({ type: 'rename' }))}>Переименовать</Dropdown.Item>
        </Dropdown.Menu>
      </>
    );
    return (
      <li key={channel.id} className="nav-item w-100">
        <Dropdown as={ButtonGroup}>
          <Button
            className="w-100 rounded-0 text-start text-truncate border-0"
            onClick={() => dispatch(setCurrentChannel(channel.id))}
            variant={variant}
          >
            {`# ${channel.name}`}
          </Button>
        {channel.removable && dropDownButton}
        </Dropdown>
      </li>
    );
  });
  console.log('channelList', channels);
  return channelsList;
};

export default ChannelsList;
