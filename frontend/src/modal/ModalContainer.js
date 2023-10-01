import CloseButton from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { hideModal } from '../slices/modalSlice';
import getModal from '.';

const ModalContainer = () => {
  console.log('modalconteiner');
  const dispatch = useDispatch();
  const activeModal = useSelector((state) => state.modals.type);
  console.log('activeModal', activeModal);
  const modalTitle = {
    add: 'Добавить канал',
    remove: 'Удалить канал',
    rename: 'Переименовать канал',
  };

  return (
    <Modal show={activeModal}>
      <Modal.Header>
        <Modal.Title className="h4">{modalTitle[activeModal]}</Modal.Title>
        <CloseButton aria-label="Close" className="btn btn-close" onClick={() => dispatch(hideModal())} />
      </Modal.Header>
      <Modal.Body>
        {getModal(activeModal)}
      </Modal.Body>
    </Modal>
  );
};

export default ModalContainer;
