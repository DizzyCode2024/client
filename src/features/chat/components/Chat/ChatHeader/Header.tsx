import useRoomStore from '@/stores/useRoomStore';
import ChannelName from './ChannelName';
import Container from './Container';

const Header = () => {
  const { name } = useRoomStore((state) => state.currentChannelInfo);

  return (
    <Container>
      <ChannelName channelName={name} />
    </Container>
  );
};

export default Header;
