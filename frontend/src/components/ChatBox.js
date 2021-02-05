import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import io from 'socket.io-client';
import InfoBar from './ChatboxComponents/InfoBar';
import MessagesField from './ChatboxComponents/MessagesField';
import SendMessageInput from './ChatboxComponents/SendMessageInput';

const ChatBox = () => {
  return (
    <div id='chat-box'>
      <InfoBar />
      <MessagesField />
      <SendMessageInput />
    </div>
  );
};

export default ChatBox;
