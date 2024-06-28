import { ChatIcon } from '@chakra-ui/icons';
import { Box, Icon, Text } from '@chakra-ui/react';
import { MdKeyboardVoice } from 'react-icons/md';
import { ChannelType } from '../../types';

const ChannelBox = ({ name, type }: { name: string; type: ChannelType }) => {
  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      mx={2}
      py={2}
      color={'gray.300'}
      borderRadius={'3px'}
      transition={'all 0.2s ease-in'}
      _hover={{ bg: 'gray.600', color: 'white' }}
      cursor={'pointer'}
    >
      <Box
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        marginLeft={2}
        width={'3rem'}
        height={'3rem'}
      >
        {type === 'CHAT' ? (
          <ChatIcon width={'2rem'} />
        ) : (
          <Icon as={MdKeyboardVoice} width={'2rem'} />
        )}
      </Box>
      <Text>{name}</Text>
    </Box>
  );
};

export default ChannelBox;
