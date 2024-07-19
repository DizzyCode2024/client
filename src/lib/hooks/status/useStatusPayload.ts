import { useAuthStore } from '@/lib/stores/useAuthStore';
import { IMember } from '@/types/member';

const useStatusPayload = () => {
  const { username, id: memberId } = useAuthStore((state) => state.user!);

  const onlinePayload: IMember = {
    memberId,
    username,
    status: 'online',
  };

  const offlinePayload: IMember = {
    memberId,
    username,
    status: 'offline',
  };

  return { onlinePayload, offlinePayload };
};

export default useStatusPayload;
