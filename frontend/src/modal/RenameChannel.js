import { Button, Form } from 'react-bootstrap';
import filter from 'leo-profanity';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { useFormik } from 'formik';
import useChat from '../hooks/useChat';
import { hideModal } from '../slices/modalSlice';
import { selectors } from '../slices/channelsSlice';

const RenameChannel = () => {
  const { t } = useTranslation();
  const { renameChannel } = useChat();
  const channels = useSelector(selectors.selectAll);
  const modalInfo = useSelector((state) => state.modals);
  console.log('active modal', modalInfo);
  const channelNames = channels.map((item) => item.name);
  const targetChannel = channels.find((c) => c.id === modalInfo.id);
  const dispatch = useDispatch();
  const ref = useRef(null);
  useEffect(() => {
    ref.current.focus();
  }, []);

  const validationSchema = yup.object().shape({
    name: yup.string()
      .min(3, t('error.wrongLength'))
      .max(20, t('error.wrongLength'))
      .required(t('error.requred'))
      .notOneOf(channelNames, t('error.mustUnique')),
  });

  const f = useFormik({
    initialValues: {
      name: targetChannel.name,
    },
    validationSchema,
    onSubmit: ({ name }, { setSubmitting }) => {
      const filteredName = filter.clean(name);
      console.log('filteredName', filteredName);
      const handleResponse = () => {
        dispatch(hideModal());
        setSubmitting(false);
        toast.success(t('notice.renameChannel'));
      };
      renameChannel({ ...targetChannel, name: filteredName }, handleResponse);
    },
  });
  return (
    <Form onSubmit={f.handleSubmit}>
      <Form.Control
        type="text"
        id="name"
        name="name"
        ref={ref}
        onChange={f.handleChange}
        value={f.values.name}
        className="mb-2 form-control"
        isInvalid={f.touched.name && f.errors.name}
        disabled={f.isSubmitting}
      />
      <Form.Label className="visually-hidden" htmlFor="name">{t('modal.label')}</Form.Label>
      <Form.Control.Feedback type="invalid">
        {f.errors.name}
      </Form.Control.Feedback>
      <div className="d-flex justify-content-end">
        <Button variant="secondary" onClick={() => dispatch(hideModal())} className="me-2">{t('modal.cancel')}</Button>
        <Button variant="primary" type="submit">{t('modal.submit')}</Button>
      </div>
    </Form>
  );
};
export default RenameChannel;
