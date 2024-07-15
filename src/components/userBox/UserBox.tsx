import { useAuthStore } from '@/lib/stores/useAuthStore';
import { StarIcon } from '@chakra-ui/icons';
import { Box, Popover, PopoverTrigger } from '@chakra-ui/react';
import UserSettingsButton from './UserSettingsButton';
import UserPopoverBox from './UserPopoverBox';

const Container = ({ children }: { children: React.ReactNode }) => (
  <Box
    minWidth={'23rem'}
    height={'5rem'}
    bg={'gray.800'}
    display={'flex'}
    justifyContent={'space-between'}
    alignItems={'center'}
    mt={'auto'}
  >
    {children}
  </Box>
);

const UserBox = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <Container>
      <Popover placement={'top'}>
        <PopoverTrigger>
          <Box
            display={'flex'}
            alignItems={'center'}
            cursor={'pointer'}
            minWidth={'19rem'}
            height={'4rem'}
            transition={'all 0.2s ease-in'}
            borderRadius={'3px'}
            _hover={{ bg: 'gray.700', color: 'white' }}
          >
            <Box
              backgroundColor={'teal.200'}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              marginLeft={2}
              width={'3rem'}
              height={'3rem'}
              borderRadius={'50%'}
            >
              <StarIcon color={'white'} width={'2rem'} />
            </Box>
            <Box
              ml={4}
              display={'flex'}
              flexDirection={'column'}
              alignItems={'center'}
              lineHeight={'short'}
            >
              <Box color={'gray.200'} fontSize={'2xl'} fontWeight={'bold'}>
                {user ? user.username : 'Guest'}
              </Box>
              <Box color={'gray.400'} fontSize={'xl'} mr={'auto'} mt={'-2px'}>
                {user ? '온라인' : '오프라인'}
              </Box>
            </Box>
          </Box>
        </PopoverTrigger>
        <UserPopoverBox />
      </Popover>

      <UserSettingsButton />
    </Container>
  );
};

export default UserBox;
