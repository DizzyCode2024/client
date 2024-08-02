import { useAuthStore } from '@/lib/stores/useAuthStore';
import { StarIcon } from '@chakra-ui/icons';
import { Box, Popover, PopoverTrigger } from '@chakra-ui/react';
import UserPopoverBox from './UserPopoverBox';
import UserSettingsButton from './UserSettingsButton';

const Container = ({ children }: { children: React.ReactNode }) => (
  <Box
    width={'full'}
    height={'3.2rem'}
    bg={'gray.800'}
    display={'flex'}
    justifyContent={'space-between'}
    alignItems={'center'}
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
            height={'2.5rem'}
            width={'11rem'}
            transition={'all 0.2s ease-in'}
            borderRadius={'3px'}
            _hover={{ bg: 'gray.700', color: 'white' }}
          >
            <Box
              backgroundColor={'purple.400'}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              marginLeft={2}
              width={'1.5rem'}
              height={'1.5rem'}
              borderRadius={'50%'}
            >
              <StarIcon color={'white'} width={'1rem'} />
            </Box>
            <Box
              ml={2}
              display={'flex'}
              flexDirection={'column'}
              alignItems={'center'}
              lineHeight={'short'}
            >
              <Box color={'gray.200'} fontSize={'sm'} fontWeight={'bold'}>
                {user ? user.username : 'Guest'}
              </Box>
              <Box color={'gray.400'} fontSize={'xs'} mr={'auto'} mt={'-2px'}>
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
