import useRoomStore from '@/lib/stores/useRoomStore';
import { ChatIcon } from '@chakra-ui/icons';
import { Box } from '@chakra-ui/react';

const NoDmUI = () => {
  const { name } = useRoomStore((state) => state.currentChannelInfo);
  return (
    <Box color={'white'} mt={'auto'} ml={5}>
      <Box
        ml={5}
        mb={5}
        bg={'gray.500'}
        width={'5rem'}
        height={'5rem'}
        borderRadius={'50%'}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <ChatIcon width={'2rem'} height={'2rem'} />
      </Box>

      <Box
        fontSize={'3xl'}
        display={'flex'}
        alignItems={'center'}
        fontWeight={'bold'}
      >
        {`${name}에 오신 걸 환영 합니다!`}
      </Box>
      <Box fontSize={'lg'} display={'flex'} alignItems={'center'}>
        <ChatIcon mr={2} />
        {`${name} 채팅 채널의 시작이에요.`}
      </Box>
    </Box>
  );
};

export default NoDmUI;
