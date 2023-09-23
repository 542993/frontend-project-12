import { Button, Form } from 'react-bootstrap';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useChat } from '../hooks';
import { setActiveModal } from '../slices/modalSlice';
import { selectors } from '../slices/channelsSlice';

const RenameChannel = () => {
  const { renameChannel } = useChat();
  const channels = useSelector(selectors.selectAll);
  const activeModal = useSelector((state) => state.modals.activeModal);
  const channelNames = channels.map((item) => item.name);
  console.log('channels', channelNames);
  const targetChannel = channels.find((c) => c.id === activeModal.id);
  const dispatch = useDispatch();
  const ref = useRef(null);
  useEffect(() => {
    ref.current.focus();
  }, []);

  const validationSchema = yup.object().shape({
    name: yup.string()
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .required('Обязательное поле')
      .notOneOf(channelNames, 'Должно быть уникальным'),
  });

  const f = useFormik({
    initialValues: {
      name: targetChannel.name,
    },
    validationSchema,
    onSubmit: ({ name }, { setSubmitting }) => {
      const handleResponse = () => {
        dispatch(setActiveModal(null));
        setSubmitting(false);
      };
      renameChannel({ ...targetChannel, name }, handleResponse);
    },
  });
  return (
  <Form onSubmit={f.handleSubmit}>
      <Form.Label className="visually-hidden" htmlFor="name">Имя канала</Form.Label>
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
      <Form.Control.Feedback type="invalid">
        {f.errors.name}
      </Form.Control.Feedback>
      <div className="d-flex justify-contend-end">
        <Button variant="secondary" onClick={() => dispatch(setActiveModal(null))} className="me-2">Отменить</Button>
        <Button variant="primary" type="submit">Отправить</Button>
      </div>
  </Form>
  );
};
export default RenameChannel;