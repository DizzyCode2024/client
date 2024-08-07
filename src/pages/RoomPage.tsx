import ChatSection from '@/components/chat';
import RoomMenu from '@/components/room/RoomMenu';
import VoiceSection from '@/components/voice';
import { QUERY_KEYS, getCategories } from '@/lib/api';
import useRoomStore from '@/lib/stores/useRoomStore';
import { IRoom } from '@/types';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const RoomPage = ({
  setMenu,
}: {
  setMenu: React.Dispatch<React.SetStateAction<React.ReactNode>>;
}) => {
  const { setCurrentChannelPath, setCurrentChannelInfo } = useRoomStore();
  const [path, setPath] = useState({ roomId: 0, channelId: 0 });
  const { roomId: roomIdStr, channelId: channelIdStr } = useParams<{
    roomId: string;
    channelId: string;
  }>();

  const queryClient = useQueryClient();
  const rooms = queryClient.getQueryData<IRoom[]>(QUERY_KEYS.ROOMS) || [];

  useEffect(() => {
    if (roomIdStr && channelIdStr) {
      setPath({
        roomId: parseInt(roomIdStr, 10),
        channelId: parseInt(channelIdStr, 10),
      });
    }
  }, [roomIdStr, channelIdStr]);

  const { data } = useQuery({
    queryKey: QUERY_KEYS.CATWCHANNELS(path.roomId),
    queryFn: () => getCategories(path.roomId),
    select: (data) => {
      if (data && data[0] && data[0].channels && data[0].channels[0]) {
        return {
          firstCategoryId: data[0].categoryId,
          firstChannelId: data[0].channels[0].channelId,

          firstChannelName: data[0].channels[0].channelName,
          firstChannelType: data[0].channels[0].channelType,
        };
      }
      return null;
    },
    enabled: !!roomIdStr,
  });

  useEffect(() => {
    if (!data) return;
    setCurrentChannelPath({
      roomId: path.roomId,
      categoryId: data?.firstCategoryId,
      channelId: path.channelId,
    });
    setCurrentChannelInfo({
      name: data?.firstChannelName,
      type: data?.firstChannelType,
    });
  }, [rooms, path, data]);

  const {
    currentChannelInfo: { type },
  } = useRoomStore();

  useEffect(() => {
    if (path.roomId === 0) {
      setMenu(<div>{'Loading...'}</div>);
    } else {
      setMenu(<RoomMenu roomId={path.roomId} />);
    }
  }, [path]);

  if (type === 'CHAT') {
    return <ChatSection />;
  }
  return <VoiceSection />;
};

export default RoomPage;
