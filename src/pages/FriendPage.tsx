import { Box } from '@chakra-ui/react';
import { useState } from 'react';

import FriendList from '../components/friend/FriendList';
import FriendRequest from '../components/friend/FriendRequest';
import FriendTopMenu from '../components/friend/FriendTopMenu';
import WaitingList from '../components/friend/WaitingList';

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
