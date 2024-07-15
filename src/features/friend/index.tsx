import { useState } from 'react';
import { Box } from '@chakra-ui/react';
import FriendList from '@/features/friend/components/FriendList';
import MainContainer from '@/components/MainContainer';
import DMList from './components/DMList';
import FriendTopMenu from './components/FriendTopMenu';
import WaitingList from './components/WaitingList';
import FriendRequest from './components/FriendRequest';

const FriendPage = () => {
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

export default FriendPage;
