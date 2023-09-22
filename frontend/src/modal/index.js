import AddChannel from './AddChannel';
import RenameChannel from './RenameChannel';
import RemoveChannel from './RemoveChannel';

const modal = {
  add: <AddChannel />,
  rename: <RenameChannel />,
  remove: <RemoveChannel />,
};

const getModal = (type) => {
  console.log('type', type);
  return modal[type];
};
export default getModal;
