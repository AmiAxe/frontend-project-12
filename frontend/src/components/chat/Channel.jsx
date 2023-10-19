import {
  Nav,
  ToggleButton,
  ButtonGroup,
  Button,
  Dropdown,
} from 'react-bootstrap';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  setCurrentChannelId,
} from '../../slices/channelsSlice';
import { showModal } from '../../slices/modalsSlice';

const Channel = (props) => {
  const { channel } = props;
  const { removable, id, name } = channel;
  const dispatch = useDispatch();
  const currentId = useSelector((state) => state.channelsReducer.currentChannelId);
  const { t } = useTranslation();

  if (removable) {
    return (
      <Nav.Item key={id} className="w-100">
        <Dropdown className="w-100" as={ButtonGroup}>
          <Button
            variant={currentId === id ? 'secondary' : null}
            onClick={() => dispatch(setCurrentChannelId(id))}
            className="w-100 rounded-0 text-start text-truncate"
          >
            {`# ${name}`}
          </Button>
          <Dropdown.Toggle
            split
            variant={currentId === id ? 'secondary' : null}
            id="dropdown-split-basic"
          >
            <span className="visually-hidden">{t('chat.hiddenText')}</span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => dispatch(showModal({ type: 'removing', channel }))}
            >
              {t('chat.dropdownItemDelete')}
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => dispatch(showModal({ type: 'renaiming', channel }))}
            >
              {t('chat.dropdownItemRename')}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Nav.Item>
    );
  }
  return (
    <Nav.Item key={id} className="w-100">
      <ToggleButton
        variant={currentId === id ? 'secondary' : null}
        type="button"
        className="w-100 rounded-0 text-start"
        onClick={() => dispatch(setCurrentChannelId(id))}
      >
        <span className="me-1">#</span>
        {name}
      </ToggleButton>
    </Nav.Item>
  );
};

export default Channel;
