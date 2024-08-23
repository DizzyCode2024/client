import { useAuthStore } from '@/lib/stores/useAuthStore';
import useStompClient from '@/lib/hooks/useStompClient';
import { useDestination } from '@/lib/hooks/useDestination';
import MessageInput from '@/components/chat/ChatInput/MessageInput';

const DmInput = () => {
  const senderId = useAuthStore((state) => state.user.id);
  const { sendMessage } = useStompClient();
  const { DmDestination } = useDestination();

  if (senderId === null) {
    return null;
  }

  return (
    <MessageInput
      destination={DmDestination}
      senderId={senderId}
      placeholder={'#DM에 메시지 보내기'}
      sendMessage={sendMessage}
    />
  );
};

export default DmInput;
