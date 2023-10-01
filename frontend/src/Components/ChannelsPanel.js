import { useSelector, useDispatch } from 'react-redux';
import { PlusSquareFill } from 'react-bootstrap-icons';
import { Button } from 'react-bootstrap';
import ChannelsList from './ChannelsList';
import { selectors } from '../slices/channelsSlice';
import { showModal } from '../slices/modalSlice';

const ChannelsPanel = () => {
  console.log('channelpannel');
  const dispatch = useDispatch();
  const channels = useSelector(selectors.selectAll);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);

  return (
    <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>Каналы</span>
        <Button
          className="p-0 text-primary btn-group-vertical border-0 form-control w-auto"
          onClick={() => dispatch(showModal({ type: 'add' }))}
          variant={null}
        >
          <PlusSquareFill size={20} />
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill px-2">
        {channels && currentChannelId && (<ChannelsList />)}
      </ul>
    </div>
  );
};

export default ChannelsPanel;
