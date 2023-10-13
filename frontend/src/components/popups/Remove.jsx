import {
  Modal,
  Form,
  Button,
  FormGroup,
} from 'react-bootstrap';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useRollbar } from '@rollbar/react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { hideModal } from '../../slices/modalsSlice';
import useApi from '../../hooks/useApi';

const Remove = () => {
  const rollbar = useRollbar();
  const channel = useSelector((state) => state.modalsReducer.channel);

  const [isSubmitting, setSubmitting] = useState(false);

  const dispatch = useDispatch();
  const api = useApi();

  const { t } = useTranslation();

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.removeChannel({ id: channel.id });
      dispatch(hideModal());
      toast.success(t('modals.remove.toastText'));
    } catch (err) {
      rollbar.error('removeChannelError');
      if (!err.isAxiosError) {
        toast.error(t('errors.unknownError'));
        return;
      } toast.error(t('errors.connectionError'));
    }
  };

  return (
    <Modal centered show>
      <Modal.Header closeButton onClick={() => dispatch(hideModal())}>
        <Modal.Title>{t('modals.remove.headline')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={(e) => onSubmit(e)}>
          <p className="lead">{t('modals.remove.confirmation')}</p>
          <FormGroup className="d-flex justify-content-end">
            <Form.Label className="visually-hidden">
              {t('modals.remove.subText')}
            </Form.Label>
            <Button
              variant="secondary"
              onClick={() => dispatch(hideModal())}
              className="me-2"
            >
              {t('modals.remove.cancelButton')}
            </Button>
            <Button
              disabled={isSubmitting}
              className="btn btn-danger me-2"
              variant="primary"
              type="submit"
              value="remove"
            >
              {t('modals.remove.submitButton')}
            </Button>
          </FormGroup>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
// END
