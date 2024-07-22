import { Flex } from '@chakra-ui/react';
import { useState } from 'react';
import useHandleDmRoom from '@/lib/hooks/handlers/useHandleDmRoom';
import Header from '../chat/ChatHeader/Header';
import ChatContainer from '../chat/ChatBody/ChatContainer';
import DmInput from './DmInput/DmInput';
import MemberList from '../memberList';
import Container from '../chat/DragFileContainer';

const DMSection = (roomId: number) => {
  const [isMembersOpen, setIsMembersOpen] = useState<boolean>(false);
  const { useDmRoomDetails } = useHandleDmRoom();
  useDmRoomDetails(roomId);
  return (
    <Container>
      <Header
        isMembersOpen={isMembersOpen}
        setIsMembersOpen={setIsMembersOpen}
      />
      <Flex flex={1}>
        <Flex flex={1} direction={'column'}>
          <ChatContainer />
          <DmInput />
        </Flex>
      </Flex>
      <Flex>{isMembersOpen && <MemberList />}</Flex>
    </Container>
  );
};

export default DMSection;
