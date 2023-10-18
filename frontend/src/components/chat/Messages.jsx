import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { messagesSelector } from '../../slices/messagesSlice';
import { channelsSelector } from '../../slices/channelsSlice';

const Messages = () => {
  const currentId = useSelector((state) => state.channelsReducer.currentChannelId);
  const messages = useSelector(messagesSelector.selectAll)
    .filter(({ channelId }) => channelId === currentId)
    .map(({ body, id, channelId, username }) => ({
    body,
    id,
    channelId,
    username,
  }));
  const channels = useSelector(channelsSelector.selectAll);
  const { t } = useTranslation();
  const messagesEnd = useRef(null);

  const getCurrentChannel = () => {
    const currentChannel = channels.find(({ id }) => id === currentId);
    if (currentChannel) {
      return currentChannel.name;
    }
    return t('defaultChannel');
  };

  useEffect(() => {
    messagesEnd.current?.scrollIntoView();
  }, [messages]);

  const renderMessages = () => {
    if (messages.length > 0) {
      return (
        <>
          {messages.map(({ body, id, username }) => (
            <div key={id} className="text-break mb-2">
              <b>
                {username}
                :
              </b>
              {body}
            </div>
          ))}
          <div ref={messagesEnd} />
        </>
      );
    }
    return null;
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
