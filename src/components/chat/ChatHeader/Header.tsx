import useRoomStore from '@/lib/stores/useRoomStore';
import { Icon } from '@chakra-ui/react';
import { MdPeopleAlt } from 'react-icons/md';
import ChannelName from './ChannelName';
import Container from './Container';

interface HeaderProps {
  isMembersOpen: boolean;
  setIsMembersOpen: (value: boolean) => void;
}

const Header = ({ isMembersOpen, setIsMembersOpen }: HeaderProps) => {
  const { name } = useRoomStore((state) => state.currentChannelInfo);

  const toggleMembersOpen = () => {
    setIsMembersOpen(!isMembersOpen);
  };

  return (
    <Container>
      <ChannelName channelName={name} />
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
