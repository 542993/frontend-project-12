import { useRef } from 'react';
import { useFormik } from 'formik';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { ArrowRightSquareFill } from 'react-bootstrap-icons';

const MessageForm = () => {
  const inputEl = useRef(null);

  const f = useFormik({
    initialValues: { message: '' },
    onSubmit: ({ message }) => {
      console.log(message);
    },
  });
  return (
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
  );
};

export default MessageForm;
