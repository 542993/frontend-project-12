import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { ArrowRightSquareFill } from 'react-bootstrap-icons';
import { useChat, useAuth } from '../hooks';

const MessageForm = () => {
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const inputEl = useRef(null);
  const { addMessage } = useChat();
  const [delivered, setDelivered] = useState(false);
  const { user } = useAuth();
  const f = useFormik({
    initialValues: { message: '' },
    onSubmit: async ({ message }, { resetForm, setSubmitting }) => {
      const newMessage = {
        channelId: currentChannelId,
        body: message,
        username: user.username,
      };
      const handleResponse = ({ status }) => {
        if (status === 'ok') {
          setDelivered(true);
          setSubmitting(false);
          resetForm();
          setTimeout(() => setDelivered(false), 2000);
        }
      };
      addMessage(newMessage, handleResponse);
    },
  });
  const renderDeliveryStatus = () => {
    if (f.isSubmitting) {
      return 'Сообщение отправляется';
    }
    if (delivered) {
      return 'Доставлено';
    }
    return '';
  };

  return (
    <>
          <div className="small text-muted">{renderDeliveryStatus()}</div>
    <Form noValidate onSubmit={f.handleSubmit} className="py-1 border rounded-2">
      <InputGroup hasValidation>
        <Form.Control
          ref={inputEl}
          onChange={f.handleChange}
          name="message"
          id="message"
          aria-label="Новое сообщение"
          placeholder="Введите сообщение..."
          className="border-0 p-0 ps-2"
          type="text"
          value={f.values.message}
          disabled={f.isSubmitting}
        />
        <Form.Label className="visually-hidden" htmlFor="message">Новое сообщение</Form.Label>
        <Button
          type="submit"
          variant={null}
          className="btn-group-vertical border-0"
          disabled={f.isSubmitting || !f.values.message}
        >
          <ArrowRightSquareFill size={20} />
          <span className="visually-hidden">Отправить</span>
        </Button>
      </InputGroup>
    </Form>
    </>

  );
};

export default MessageForm;
