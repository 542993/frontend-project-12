import AddChannel from './AddChannel';
import RenameChannel from './RenameChannel';
import DeleteChannel from './DeleteChannel';

const modal = {
  add: <AddChannel />,
  rename: <RenameChannel />,
  delete: <DeleteChannel />,
};

const getModal = (type) => {
  console.log('type', type);
  return modal[type];
};
export default getModal;
