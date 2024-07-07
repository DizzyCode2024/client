import useRoomStore from '@/stores/useRoomStore';
import ChannelName from './ChannelName';
import Container from './Container';

const Header = () => {
  const { currentChannelName } = useRoomStore();

  return (
    <Container>
      <ChannelName channelName={currentChannelName} />
    </Container>
  );
};

export default Header;
