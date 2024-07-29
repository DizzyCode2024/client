import { ChatIcon } from '@chakra-ui/icons';
import { Box } from '@chakra-ui/react';

const DmName = ({ dmName }: { dmName: string | null }) => {
  return (
    <Box display={'flex'} alignItems={'center'}>
      <Box
        color={'white'}
        textAlign={'left'}
        pr={7}
        fontSize={'md'}
        fontWeight={'bold'}
      >
        <ChatIcon marginRight={2} color={'gray.200'} />
        {dmName}
      </Box>
    </Box>
  );
};

export default DmName;
