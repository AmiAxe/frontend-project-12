import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { messagesSelector } from '../../slices/messagesSlice';
import { channelsSelector } from '../../slices/channelsSlice';
import { AuthContext } from '../../contexts/authContext';

const Messages = () => {
  const currentId = useSelector((state) => state.channelsReducer.currentChannelId);
  const messages = useSelector(messagesSelector.selectAll)
    .filter(({ channelId }) => channelId === currentId);
  const channels = useSelector(channelsSelector.selectAll);
  const { t } = useTranslation();
  const { currentUser } = useContext(AuthContext);

  const getCurrentChannel = () => {
    const currentChannel = channels.find(({ id }) => id === currentId);
    if (currentChannel) {
      return currentChannel.name;
    }
    return t('defaultChannel');
  };

  const renderMessages = () => {
    if (!currentUser) {
      return null;
    } return messages.map(({ body, id, currentUser }) => (
      <div key={id} className="text-break mb-2">
        <b>
          {currentUser}
          :
        </b>
        {body}
      </div>
    ));
  };

  return (
    <>
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>{`# ${getCurrentChannel()}`}</b>
        </p>
        <span className="text-muted">
          {t('chat.counter.count', { count: messages.length })}
        </span>
      </div>
      <div
        id="messages-box"
        className="chat-messages overflow-auto px-5 "
      >
        {renderMessages()}
      </div>
    </>
  );
};

export default Messages;
