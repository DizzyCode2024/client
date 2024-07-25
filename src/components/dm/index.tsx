import { Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { RoomId } from '@/types';
import useDmStore from '@/lib/stores/useDmStore';

import DmInput from './DmInput/DmInput';
import MemberList from '../memberList';
import Container from '../chat/DragFileContainer';
import DMContainer from './DMBody/DmContainer';
import Header from './DmHeader/Header';

const DMSection = ({ roomId }: { roomId: RoomId }) => {
  const [isMembersOpen, setIsMembersOpen] = useState<boolean>(false);

  const { dmRooms, currentDmRoom, setCurrentDmRoom } = useDmStore();

  useEffect(() => {
    if (roomId && roomId !== currentDmRoom?.roomId) {
      const roomData = dmRooms.find((room) => room.roomId === roomId);
      if (roomData) {
        setCurrentDmRoom(roomData);
      }
    }
  }, [roomId, currentDmRoom, setCurrentDmRoom, dmRooms]);

  return (
    <Container>
      <Header
        isMembersOpen={isMembersOpen}
        setIsMembersOpen={setIsMembersOpen}
      />
      <Flex flex={1}>
        <Flex flex={1} direction={'column'}>
          <DMContainer />
          <DmInput />
        </Flex>
      </Flex>
      <Flex>{isMembersOpen && <MemberList />}</Flex>
    </Container>
  );
};

export default DMSection;
