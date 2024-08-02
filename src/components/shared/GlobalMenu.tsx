import { Box } from '@chakra-ui/react';
import UserBox from '../userBox';
import VoiceBox from '../voice/GlobalVoiceBox';

const GlobalMenu = () => {
  return (
    <Box mt={'auto'}>
      <VoiceBox />
      <UserBox />
    </Box>
  );
};

export default GlobalMenu;
