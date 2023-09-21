import CloseButton from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveModal } from '../slices/modalSlice';
import getModal from '.';


const ModalContainer = () => {
  const dispatch = useDispatch();
  const activeModal = useSelector((state) => state.modals.activeModal);
  const modalTitle = {
    add: 'Добавить канал',
    delete: 'Удалить канал',
    rename: 'Переименовать канал',
  };
  console.log('lol', getModal(activeModal.type));
  return (
    <Modal show={activeModal}>
      <Modal.Header>
        <Modal.Title className="h4">{modalTitle[activeModal.type]}</Modal.Title>
        <CloseButton aria-label="Close" className="btn btn-close" onClick={() => dispatch(setActiveModal(null))} />
      </Modal.Header>
      <Modal.Body>
         {getModal(activeModal.type)}
      </Modal.Body>
    </Modal>
  );
};

export default ModalContainer;
