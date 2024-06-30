import { useState } from 'react';
import { Box } from '@chakra-ui/react';
import FriendList from '@/features/room/components/Friend/FriendList';
import DMList from '../components/DMList';
import MainContainer from '../../../components/MainContainer';
import FriendTopMenu from '../components/Friend/FriendTopMenu';
import WaitingList from '../components/Friend/WaitingList';
import FriendRequest from '../components/Friend/FriendRequest';

const DMPage = () => {
  const [selectedMenu, setSelectedMenu] = useState('모두');

  const renderContent = () => {
    switch (selectedMenu) {
      case '모두':
        return <FriendList />;
      case '대기중':
        return <WaitingList />;
      case '친구 추가하기':
        return <FriendRequest />;
      default:
        return null;
    }
  };

  return (
    <MainContainer>
      <DMList />
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
    </MainContainer>
  );
};

export default DMPage;
