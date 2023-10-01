import { Button, Form } from 'react-bootstrap';
import filter from 'leo-profanity';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { useFormik } from 'formik';
import useChat from '../hooks/useChat';
import { setActiveModal } from '../slices/modalSlice';
import { setCurrentChannel, selectors } from '../slices/channelsSlice';

const AddChannel = () => {
  const { t } = useTranslation();
  const { addChannel } = useChat();
  const channels = useSelector(selectors.selectAll);
  const channelNames = channels.map((item) => item.name);
  console.log('channels', channelNames);
  const dispatch = useDispatch();
  const validationSchema = yup.object().shape({
    name: yup.string()
      .min(3, t('error.wrongLength'))
      .max(20, t('error.wrongLength'))
      .required(t('error.required'))
      .notOneOf(channelNames, t('error.mustUnique')),
  });

  const f = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema,
    onSubmit: ({ name }, { setSubmitting }) => {
      const filteredName = filter.clean(name);
      const handleResponse = ({ data }) => {
        console.log('response', data);
        dispatch(setCurrentChannel(data.id));
        dispatch(setActiveModal(null));
        setSubmitting(false);
        toast.success(t('notice.newChannel'));
      };
      addChannel({ name: filteredName }, handleResponse);
    },
  });
  return (
    <Form onSubmit={f.handleSubmit}>
      <Form.Label className="visually-hidden" htmlFor="name">{t('modal.label')}</Form.Label>
      <Form.Control
        type="text"
        id="name"
        name="name"
        onChange={f.handleChange}
        value={f.values.name}
        className="mb-2 form-control"
        isInvalid={f.touched.name && f.errors.name}
        disabled={f.isSubmitting}
      />
      <Form.Control.Feedback type="invalid">
        {f.errors.name}
      </Form.Control.Feedback>
      <div className="d-flex justify-content-end">
        <Button variant="secondary" onClick={() => dispatch(setActiveModal(null))} className="me-2">{t('modal.cancel')}</Button>
        <Button variant="primary" type="submit">{t('modal.submit')}</Button>
      </div>
    </Form>
  );
};
export default AddChannel;
