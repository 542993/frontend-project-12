import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { ArrowRightSquareFill } from 'react-bootstrap-icons';
import { useChat, useAuth } from '../hooks';

const MessageForm = () => {
  const { t } = useTranslation();
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const inputEl = useRef(null);
  const { addMessage } = useChat();
  const [delivered, setDelivered] = useState(false);
  const { user } = useAuth();
  const f = useFormik({
    initialValues: { message: '' },
    onSubmit: async ({ message }, { resetForm, setSubmitting }) => {
      const filteredText = filter.clean(message);
      const newMessage = {
        channelId: currentChannelId,
        body: filteredText,
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
      return t('messagesStatus.sending');
    }
    if (delivered) {
      return t('messagesStatus.delivered');
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
            aria-label={t('messageLabel')}
            placeholder={t('messagePlaceholder')}
            className="border-0 p-0 ps-2"
            type="text"
            value={f.values.message}
            disabled={f.isSubmitting}
          />
          <Form.Label className="visually-hidden" htmlFor="message">{t('messageLabel')}</Form.Label>
          <Button
            type="submit"
            variant={null}
            className="btn-group-vertical border-0"
            disabled={f.isSubmitting || !f.values.message}
          >
            <ArrowRightSquareFill size={20} />
            <span className="visually-hidden">{t('messageButton')}</span>
          </Button>
      </InputGroup>
      </Form>
    </>

  );
};

export default MessageForm;
