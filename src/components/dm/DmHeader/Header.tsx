import { Icon } from '@chakra-ui/react';
import { MdPeopleAlt } from 'react-icons/md';
import Container from '@/components/chat/ChatHeader/Container';
import useDmStore from '@/lib/stores/useDmStore';
import DmName from './DmName';

interface HeaderProps {
  isMembersOpen: boolean;
  setIsMembersOpen: (value: boolean) => void;
}

const Header = ({ isMembersOpen, setIsMembersOpen }: HeaderProps) => {
  const { currentDmRoom } = useDmStore();

  const toggleMembersOpen = () => {
    setIsMembersOpen(!isMembersOpen);
  };

  const dmName = currentDmRoom?.roomName || currentDmRoom?.temporaryRoomName;

  return (
    <Container>
      <DmName dmName={dmName} />
      <Icon
        as={MdPeopleAlt}
        color={isMembersOpen ? 'white' : 'gray.300'}
        boxSize={6}
        onClick={toggleMembersOpen}
        _hover={{ color: 'white' }}
        cursor={'pointer'}
      />
    </Container>
  );
};

export default Header;
