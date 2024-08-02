import GlobalMenu from '@/components/shared/GlobalMenu';
import MenuContainer from '@/components/shared/MenuContainer';
import { QUERY_KEYS, axiosInstance, getRooms } from '@/lib/api';
import useRoomSubscriptions from '@/lib/hooks/socket/useRoomSubscriptions';
import useSocketConnection from '@/lib/hooks/socket/useSocketConnection';
import useStatusUpdater from '@/lib/hooks/socket/useStatusUpdater';
import useHeartbeat from '@/lib/hooks/status/useHeartbeat';
import useAxiosInterceptor from '@/lib/hooks/useAxiosInterceptor';
import DMPage from '@/pages/DMPage';
import ExplorePage from '@/pages/ExplorePage';
import FriendPage from '@/pages/FriendPage';
import RoomPage from '@/pages/RoomPage';
import { IRoom } from '@/types';
import { Box } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import RoomList from '../components/room/RoomList';

const LoggedRouter = () => {
  const [menu, setMenu] = useState<ReactNode>(<div>{'Loading...'}</div>);

  // set up axiosInstance
  const interceptor = useAxiosInterceptor(axiosInstance);

  // get rooms
  const { data: rooms } = useQuery<IRoom[], Error>({
    queryKey: QUERY_KEYS.ROOMS,
    queryFn: getRooms,
  });

  useSocketConnection();
  useRoomSubscriptions(rooms);
  useHeartbeat(10000);
  useStatusUpdater(rooms);

  if (!interceptor) {
    return <div>{'Loading...'}</div>;
  }

  return (
    <Box display={'flex'}>
      <RoomList />
      <MenuContainer>
        {menu}
        <GlobalMenu />
      </MenuContainer>

      <Routes>
        <Route path={'/main'} element={<FriendPage setMenu={setMenu} />} />
        <Route path={'/main/:id'} element={<DMPage setMenu={setMenu} />} />
        <Route
          path={'/channels/:roomId/:channelId'}
          element={<RoomPage setMenu={setMenu} />}
        />
        <Route path={'/explore'} element={<ExplorePage setMenu={setMenu} />} />
      </Routes>
    </Box>
  );
};

export default LoggedRouter;
