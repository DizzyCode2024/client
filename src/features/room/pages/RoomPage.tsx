import useRoomStore from '@/stores/useRoomStore';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/api/queryKeys';
import ChatSection from '../../chat/components/ChatSection';
import MainContainer from '../../../components/MainContainer';
import RoomMenu from '../components/RoomMenu/RoomMenu';
import { getCategories } from '../api/categoryApi';
import { RoomId } from '../types';

const RoomPage = () => {
  const { id } = useParams<{ id: string }>();
  const roomId: RoomId = id ? Number(id) : 0;

  const { setCurrentChannel, setCurrentChannelName } = useRoomStore();

  const { data } = useQuery({
    queryKey: QUERY_KEYS.CATWCHANNELS(roomId),
    queryFn: () => getCategories(roomId),
    select: (data) => {
      if (data && data[0] && data[0].channels && data[0].channels[0]) {
        return {
          categoryId: data[0].categoryId,
          channelId: data[0].channels[0].channelId,
          channelName: data[0].channels[0].channelName,
        };
      }
      return null;
    },
    enabled: roomId !== 0,
  });

  useEffect(() => {
    if (roomId && data) {
      setCurrentChannel({
        roomId,
        categoryId: data.categoryId,
        channelId: data.channelId,
      });
      setCurrentChannelName(data.channelName);
    }
  }, [roomId, data, setCurrentChannel, setCurrentChannelName]);

  return (
    <MainContainer>
      <RoomMenu />
      <ChatSection />
    </MainContainer>
  );
};

export default RoomPage;
