import React, { useEffect, useRef } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import _ from 'lodash';
import { useFormik } from 'formik';
import { Modal, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useRollbar } from '@rollbar/react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { channelsSelector } from '../../slices/channelsSlice';
import { hideModal } from '../../slices/modalsSlice';
import useApi from '../../hooks/useApi';

const Add = () => {
  const rollbar = useRollbar();
  const channels = useSelector(channelsSelector.selectAll);
  const channelsNames = channels.map(({ name }) => name);
  const dispatch = useDispatch();
  const api = useApi();
  const inputEl = useRef(null);

  const { t } = useTranslation();

  const addingSchema = Yup.object().shape({
    channelName: Yup.string()
      .min(3, 'errors.nameMinlength')
      .required('errors.required')
      .notOneOf(channelsNames, 'errors.notOneOfChannel'),
  });

  const formik = useFormik({
    initialValues: {
      channelName: '',
      channel: {},
    },
    validationSchema: addingSchema,
    onSubmit: async () => {
      if (formik.values.channelName !== '') {
        const newChannel = {
          id: _.uniqueId(),
          name: formik.values.channelName,
          removable: true,
        };
        try {
          await api.newChannel(newChannel);
          dispatch(hideModal());
          toast.success(t('modals.add.toastText'));
          inputEl.current.focus();
        } catch (err) {
          rollbar.error('addChannelError');
          if (!err.isAxiosError) {
            toast.error(t('errors.unknownError'));
            return;
          } toast.error(t('errors.connectionError'));
        }
      }
    },
  });

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  return (
    <Modal centered show>
      <Modal.Header closeButton onClick={() => dispatch(hideModal())}>
        <Modal.Title>{t('modals.add.headline')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="name" className="visually-hidden">
              {t('modals.add.channelName')}
            </Form.Label>
            <Form.Control
              id="name"
              ref={inputEl}
              data-testid="input-body"
              name="channelName"
              required=""
              onChange={formik.handleChange}
              value={formik.values.channelName}
              isInvalid={
                !!formik.errors.channelName && formik.touched.channelName
              }
            />
            <Form.Control.Feedback type="invalid">
              {t(formik.errors.channelName)}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="d-flex justify-content-end">
            <Button
              variant="secondary"
              onClick={() => dispatch(hideModal())}
              className="me-2"
            >
              {t('modals.add.cancelButton')}
            </Button>
            <Button disabled={formik.isSubmitting} variant="primary" type="submit" value="submit">
              {t('modals.add.submitButton')}
            </Button>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Add;
