import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { setActiveModal } from '../slices/modalSlice';
import { useChat } from '../hooks/index';

const RemoveChannel = () => {
  const activeModal = useSelector((state) => state.modals.activeModal);
  const { removeChannel } = useChat();
  const dispatch = useDispatch();
  const f = useFormik({
    initialValues: {},
    onSubmit: (_, { setSubmitting }) => {
      const handleResponse = () => {
        dispatch(setActiveModal(null));
        setSubmitting(false);
      };
      removeChannel({ id: activeModal.id }, handleResponse);
    },
  });

  return (
    <Form onSubmit={f.handleSubmit}>
      <p className="lead">Уверены?</p>
      <div className="d-flex justify-content-end">
        <Button variant="btn-secondary" onClick={() => dispatch(setActiveModal(null))} className="me-2">
          Отменить
        </Button>
        <Button variant="danger" type="submit" disabled={f.isSubmitting}>
          Удалить
        </Button>
      </div>
    </Form>
  );
};

export default RemoveChannel;
