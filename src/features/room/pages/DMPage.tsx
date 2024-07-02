import { useState } from 'react';
import { Box } from '@chakra-ui/react';
import FriendList from '@/features/friend/components/FriendList';
import DMList from '../components/DMList';
import MainContainer from '../../../components/MainContainer';
import FriendTopMenu from '../../friend/components/FriendTopMenu';
import WaitingList from '../../friend/components/WaitingList';
import FriendRequest from '../../friend/components/FriendRequest';

const DMPage = () => {
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

export default DMPage;
