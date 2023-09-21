import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useChat } from '../hooks';
import { setActiveModal } from '../slices/modalSlice';
import { setCurrentChannel, selectors } from '../slices/channelsSlice';

const AddChannel = () => {
  const { addChannel } = useChat();
  const channels = useSelector(selectors.selectAll);
  const channelNames = channels.map((item) => item.name);
  console.log('channels', channelNames);
  const dispatch = useDispatch();
  const validationSchema = yup.object().shape({
    name: yup.string()
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .required('Обязательное поле')
      .notOneOf(channelNames, 'Должно быть уникальным'),
  });

  const f = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema,
    onSubmit: ({ name }, { setSubmitting }) => {
      console.log('name', name);
      const handleResponse = ({ data }) => {
        console.log('response', data);
        dispatch(setCurrentChannel(data.id));
        dispatch(setActiveModal(null));
        setSubmitting(false);
      };
      addChannel({ name }, handleResponse);
    },
  });
  return (
  <Form onSubmit={f.handleSubmit}>
      <Form.Label className="visually-hidden" htmlFor="name">Имя канала</Form.Label>
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
      <div className="d-flex justify-contend-end">
        <Button variant="secondary" onClick={() => dispatch(setActiveModal(null))} className="me-2">Отменить</Button>
        <Button variant="primary" type="submit">Отправить</Button>
      </div>
  </Form>
  );
};
export default AddChannel;
