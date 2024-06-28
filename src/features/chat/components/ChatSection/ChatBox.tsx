import { IChatMessage } from '../../types';

const ChatBox = ({ sender, content }: IChatMessage) => {
  return (
    <>
      <div>{sender}</div>
      <div>{content}</div>
    </>
  );
};

export default ChatBox;
