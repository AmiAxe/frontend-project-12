import {
  Image,
  Form,
  Button,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useRollbar } from '@rollbar/react';
import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import leoProfanity from 'leo-profanity';
import useApi from '../../hooks/useApi';

const MessageForm = () => {
  const rollbar = useRollbar();
  const currentId = useSelector((state) => state.channelsReducer.currentChannelId);

  const api = useApi();

  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: { body: '' },
    onSubmit: async ({ body }) => {
      const filtered = leoProfanity.clean(body);
      const newMessage = {
        body: filtered,
        channelId: currentId,
        username: 'admin',
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

  const inputEl = useRef(null);
  useEffect(() => {
    inputEl.current.focus();
  }, [formik]);

  return (
    <Form
      noValidate=""
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
          disabled=""
          className="btn btn-group-vertical"
        >
          <Image src={`${process.env.PUBLIC_URL}/send.svg`} />
          <span className="visually-hidden">{t('chat.submitButton')}</span>
        </Button>
      </div>
    </Form>
  );
};

export default MessageForm;
