import useDmStore from '@/lib/stores/useDmStore';
import { ChatIcon } from '@chakra-ui/icons';
import { Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const NoDmUI = () => {
  const { currentDmRoom } = useDmStore();
  const [dmName, setDmName] = useState('');

  useEffect(() => {
    if (currentDmRoom) {
      const name = currentDmRoom.roomName || currentDmRoom.temporaryRoomName;
      setDmName(name);
    } else {
      setDmName('');
    }
  }, [currentDmRoom]);

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
        {`${dmName}`}
      </Box>
      <Box fontSize={'lg'} display={'flex'} alignItems={'center'}>
        <ChatIcon mr={2} />
        {`${dmName} 님과 나눈 대화의 첫 시작이에요.`}
      </Box>
    </Box>
  );
};

export default NoDmUI;
