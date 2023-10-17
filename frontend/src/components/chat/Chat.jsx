import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useRollbar } from '@rollbar/react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import routes from '../../routes';
import {
  setChannels,
} from '../../slices/channelsSlice';
import {
  setMessages,
} from '../../slices/messagesSlice';
import Modal from '../popups/Modal';
import Channels from './Channels';
import Messages from './Messages';
import MessageForm from './MessageForm';
import useAuth from '../../hooks/useAuth';

const Chat = () => {
  const rollbar = useRollbar();

  const dispatch = useDispatch();

  const { logOut, getAuthHeader } = useAuth();

  const { t } = useTranslation();

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const { data } = await axios.get(routes.usersPath(), {
          headers: getAuthHeader(),
        });
        dispatch(setChannels(data.channels));
        dispatch(setMessages(data.messages));
      } catch (err) {
        rollbar.error('fetchDataError');
        if (!err.isAxiosError) {
          toast.error(t('errors.unknownError'));
          return;
        } if (err.response && err.response.status === 401) {
          logOut();
          return;
        } toast.error(t('errors.connectionError'));
      }
    };
    fetchContent();
  }, [dispatch, rollbar, t]);

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Channels />
        <Col className="p-0 h-100">
          <div className="d-flex flex-column h-100">
            <Messages />
            <div className="mt-auto px-5 py-3">
              <MessageForm />
            </div>
          </div>
        </Col>
      </Row>
      <Modal />
    </Container>
  );
};

export default Chat;
