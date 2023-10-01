import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { setActiveModal } from '../slices/modalSlice';
import useChat from '../hooks/useAuthContext';

const RemoveChannel = () => {
  const { t } = useTranslation();
  const activeModal = useSelector((state) => state.modals.activeModal);
  const { removeChannel } = useChat();
  const dispatch = useDispatch();
  const f = useFormik({
    initialValues: {},
    onSubmit: (_, { setSubmitting }) => {
      const handleResponse = () => {
        dispatch(setActiveModal(null));
        setSubmitting(false);
        toast.success(t('notice.removeChannel'));
      };
      removeChannel({ id: activeModal.id }, handleResponse);
    },
  });

  return (
    <Form onSubmit={f.handleSubmit}>
      <p className="lead">{t('modal.confirmRemove')}</p>
      <div className="d-flex justify-content-end">
        <Button variant="btn-secondary" onClick={() => dispatch(setActiveModal(null))} className="me-2">
          {t('modal.cancel')}
        </Button>
        <Button variant="danger" type="submit" disabled={f.isSubmitting}>
          {t('modal.delete')}
        </Button>
      </div>
    </Form>
  );
};

export default RemoveChannel;
