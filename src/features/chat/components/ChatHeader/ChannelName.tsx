import { ChatIcon } from '@chakra-ui/icons';
import { Box } from '@chakra-ui/react';

const ChannelName = ({ channelName }: { channelName: string }) => {
  return (
    <Box display={'flex'} alignItems={'center'}>
      <Box
        color={'white'}
        textAlign={'left'}
        pl={2}
        pr={7}
        fontSize={'2xl'}
        fontWeight={'bold'}
      >
        <ChatIcon marginRight={2} color={'gray.200'} />
        {channelName}
      </Box>
    </Box>
  );
};

export default ChannelName;
