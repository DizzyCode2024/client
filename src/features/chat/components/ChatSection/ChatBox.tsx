import { IChatMessage } from '../../types';

const ChatBox = ({ senderId, content }: IChatMessage) => {
  return (
    <>
      <div>{senderId}</div>
      <div>{content}</div>
    </>
  );
};

export default ChatBox;
