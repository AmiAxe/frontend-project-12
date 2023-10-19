import {
  Nav,
  Button,
  Col,
  Image,
} from 'react-bootstrap';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { channelsSelector } from '../../slices/channelsSlice';
import { showModal } from '../../slices/modalsSlice';
import Channel from './Channel';

const Channels = () => {
  const dispatch = useDispatch();
  const channels = useSelector(channelsSelector.selectAll);
  const { t } = useTranslation();

  const handleAddChannel = () => {
    dispatch(showModal({ type: 'adding' }));
  };

  if (channels.length === 0) {
    return null;
  }
  return (
    <Col className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('chat.headline')}</b>
        <Button
          type="button"
          variant="light"
          className="p-0 text-primary btn btn-group-vertical"
          onClick={handleAddChannel}
        >
          <Image src={`${process.env.PUBLIC_URL}/plus.svg`} />
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <Nav
        id="channels-box"
        className="flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
      >
        {channels.map((channel) => (
          <Channel
            key={channel.id}
            channel={channel}
          />
        ))}
      </Nav>
    </Col>
  );
};

export default Channels;
