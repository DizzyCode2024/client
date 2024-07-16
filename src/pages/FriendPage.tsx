import { useState } from 'react';
import { Box } from '@chakra-ui/react';

import DMList from '../components/friend/DMList';
import FriendTopMenu from '../components/friend/FriendTopMenu';
import WaitingList from '../components/friend/WaitingList';
import FriendRequest from '../components/friend/FriendRequest';
import MainContainer from '../components/shared/MainContainer';
import FriendList from '../components/friend/FriendList';

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
