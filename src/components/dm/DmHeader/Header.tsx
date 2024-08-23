import { Box, Icon, Tooltip, useDisclosure } from '@chakra-ui/react';
import { MdPeopleAlt, MdPersonAdd } from 'react-icons/md';
import Container from '@/components/chat/ChatHeader/Container';
import useDmStore from '@/lib/stores/useDmStore';
import DmName from './DmName';
import AddFriendModal from './AddFriendModal';

interface HeaderProps {
  isMembersOpen: boolean;
  setIsMembersOpen: (value: boolean) => void;
}

const Header = ({ isMembersOpen, setIsMembersOpen }: HeaderProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { currentDmRoom } = useDmStore();

  const toggleMembersOpen = () => {
    setIsMembersOpen(!isMembersOpen);
  };

  if (currentDmRoom === null) {
    return null;
  }
  return (
    <Container>
      <DmName
        dmName={currentDmRoom.roomName || currentDmRoom.temporaryRoomName}
      />
      <Box display={'flex'}>
        <Tooltip label={'DM으로 친구 초대하기'} bg={'black'} hasArrow>
          <Box>
            <Icon
              as={MdPersonAdd}
              color={isMembersOpen ? 'white' : 'gray.300'}
              boxSize={6}
              onClick={onOpen}
              _hover={{ color: 'white' }}
              cursor={'pointer'}
              mr={4}
            />
          </Box>
        </Tooltip>
        <Icon
          as={MdPeopleAlt}
          color={isMembersOpen ? 'white' : 'gray.300'}
          boxSize={6}
          onClick={toggleMembersOpen}
          _hover={{ color: 'white' }}
          cursor={'pointer'}
        />
      </Box>
      <AddFriendModal isOpen={isOpen} onClose={onClose} />
    </Container>
  );
};

export default Header;
