import React, { useEffect, useRef, useContext } from 'react';
import { Button, Form, Image } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useRollbar } from '@rollbar/react';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import useApi from '../../hooks/useApi.jsx';
import { AuthContext } from '../../contexts/authContext';
import 'react-toastify/dist/ReactToastify.css';

const MessageForm = () => {
  const rollbar = useRollbar();
  const currentId = useSelector((state) => state.channelsReducer.currentChannelId);
  const api = useApi();
  const { user } = useContext(AuthContext);
  const { t } = useTranslation();
  const inputEl = useRef(null);

  const formik = useFormik({
    initialValues: {
      text: '',
    },
    onSubmit: async () => {
      const newMessage = {
        body: filter.clean(formik.values.text),
        channelId: currentId,
        username: user.username,
      };
      try {
        await api.newMessage(newMessage);
        formik.resetForm();
      } catch (err) {
        rollbar.error('sendingMessageError');
        if (!err.isAxiosError) {
          toast.error(t('errors.unknownError'));
          return;
        } if (err.code === 'ERR_NETWORK') {
          toast.error(t('errors.connectionError'));
        }
      }
    },
  });

  useEffect(() => {
    inputEl.current.focus();
  }, [formik]);

  return (
    <Form
      noValidate
      onSubmit={formik.handleSubmit}
      className="py-1 border rounded-2"
    >
      <div className="input-group has-validation">
        <input
          ref={inputEl}
          name="text"
          required
          aria-label={t('chat.newMessage')}
          placeholder={t('chat.inputText')}
          className="border-0 p-0 ps-2 form-control"
          value={formik.values.text}
          onChange={formik.handleChange}
        />
        <Button
          type="submit"
          variant="light"
          className="btn btn-group-vertical"
          disabled={formik.values.text === ''}
        >
          <Image src={`${process.env.PUBLIC_URL}/send.svg`} />
          <span className="visually-hidden">{t('chat.submitButton')}</span>
        </Button>
      </div>
    </Form>
  );
};

export default MessageForm;
