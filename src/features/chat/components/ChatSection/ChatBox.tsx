import { ISendChatPayload } from '../../types';

const ChatBox = ({ senderId, content }: ISendChatPayload) => {
  return (
    <>
      <div>{senderId}</div>
      <div>{content}</div>
    </>
  );
};

export default ChatBox;
