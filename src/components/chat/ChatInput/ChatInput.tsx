import { useAuthStore } from '@/lib/stores/useAuthStore';
import useStompClient from '@/lib/hooks/useStompClient';
import { useDestination } from '@/lib/hooks/useDestination';
import MessageInput from './MessageInput';

const ChatInput = () => {
  const senderId = useAuthStore((state) => state.user?.id);
  const { sendMessage } = useStompClient();
  const { ChatDestination } = useDestination();

  if (!senderId) return null;
  return (
    <MessageInput
      destination={ChatDestination}
      senderId={senderId}
      placeholder={'#일반채팅에 메시지 보내기'}
      sendMessage={sendMessage}
    />
  );
};

export default ChatInput;
