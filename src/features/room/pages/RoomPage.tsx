import { QUERY_KEYS } from '@/api/queryKeys';
import useRoomStore from '@/stores/useRoomStore';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import VoiceSection from '@/features/chat/components/Voice';
import MainContainer from '../../../components/MainContainer';
import ChatSection from '../../chat/components/Chat';
import { getCategories } from '../api/categoryApi';
import RoomMenu from '../components/RoomMenu/RoomMenu';
import { RoomId } from '../types';

const RoomPage = () => {
  const { id } = useParams<{ id: string }>();
  const roomId: RoomId = id ? Number(id) : 0;

  const {
    setCurrentChannelPath,
    setCurrentChannelInfo,
    currentChannelInfo: { type },
  } = useRoomStore();

  const { data } = useQuery({
    queryKey: QUERY_KEYS.CATWCHANNELS(roomId),
    queryFn: () => getCategories(roomId),
    select: (data) => {
      if (data && data[0] && data[0].channels && data[0].channels[0]) {
        return {
          categoryId: data[0].categoryId,
          channelId: data[0].channels[0].channelId,
          channelName: data[0].channels[0].channelName,
          channelType: data[0].channels[0].channelType,
        };
      }
      return null;
    },
    enabled: roomId !== 0,
  });

  useEffect(() => {
    if (roomId && data) {
      setCurrentChannelPath({
        roomId,
        categoryId: data.categoryId,
        channelId: data.channelId,
      });
      setCurrentChannelInfo({ name: data.channelName, type: data.channelType });
    }
  }, [roomId, data, setCurrentChannelPath, setCurrentChannelInfo]);

  return (
    <MainContainer>
      <RoomMenu />
      {type === 'CHAT' ? <ChatSection /> : <VoiceSection />}
    </MainContainer>
  );
};

export default RoomPage;
