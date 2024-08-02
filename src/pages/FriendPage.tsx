import DMList from '@/components/dm/DMList';
import useDmStore from '@/lib/stores/useDmStore';
import { Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FriendList from '../components/friend/FriendList';
import FriendRequest from '../components/friend/FriendRequest';
import FriendTopMenu from '../components/friend/FriendTopMenu';
import WaitingList from '../components/friend/WaitingList';

const FriendPage = ({
  setMenu,
}: {
  setMenu: React.Dispatch<React.SetStateAction<React.ReactNode>>;
}) => {
  const param = useParams();
  const roomIdParam = param.id ? parseInt(param.id, 10) : 0;

  const { setCurrentDmId, dmRooms, setCurrentDmRoom } = useDmStore();

  useEffect(() => {
    setCurrentDmId(roomIdParam);
    const currentRoom = dmRooms.find((room) => room.roomId === roomIdParam);
    if (currentRoom) {
      setCurrentDmRoom(currentRoom);
    }
  }, [dmRooms, roomIdParam, setCurrentDmId, setCurrentDmRoom]);

  const [selectedMenu, setSelectedMenu] = useState('모두');

  const renderContent = () => {
    switch (selectedMenu) {
      case '모두':
        return <FriendList />;
      case '친구 요청':
        return <WaitingList />;
      case '친구 추가하기':
        return <FriendRequest />;
      default:
        return null;
    }
  };

  useEffect(() => {
    setMenu(<DMList />);
  }, []);

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      width={'100%'}
      whiteSpace={'nowrap'}
    >
      <FriendTopMenu
        selectedMenu={selectedMenu}
        onSelectMenu={setSelectedMenu}
      />
      {renderContent()}
    </Box>
  );
};

export default FriendPage;
