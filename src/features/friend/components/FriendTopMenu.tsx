import { ChatIcon, StarIcon, UnlockIcon } from '@chakra-ui/icons';
import { Box, Tooltip } from '@chakra-ui/react';
import { useAuthActions } from '@/features/auth/hooks/useAuthActions';

const Container = ({ children }: { children: React.ReactNode }) => (
  <Box
    width={'100%'}
    height={'4rem'}
    display={'flex'}
    justifyContent={'space-between'}
    alignItems={'center'}
    bg={'gray.600'}
    color={'gray.100'}
    boxShadow={'base'}
    p={'6'}
  >
    {children}
  </Box>
);

const MenuList = ['모두', '친구 요청', '친구 추가하기'];

const FriendTopMenu = ({
  selectedMenu,
  onSelectMenu,
}: {
  selectedMenu: string;
  onSelectMenu: (menu: string) => void;
}) => {
  const { signout } = useAuthActions();
  const handleLogout = () => {
    signout();
  };

  return (
    <Container>
      <Box display={'flex'} alignItems={'center'}>
        <Box
          color={'white'}
          textAlign={'left'}
          paddingLeft={2}
          paddingRight={7}
          fontSize={'2xl'}
          fontWeight={'bold'}
          borderRight={'1px'}
          borderRightColor={'gray.500'}
          borderRightWidth={'1px'}
        >
          <StarIcon marginRight={2} width={'2rem'} color={'gray.200'} />
          {'친구'}
        </Box>
        <Box display={'flex'} marginLeft={4}>
          {MenuList.map((menu) => (
            <Box
              as={'button'}
              key={menu}
              display={'flex'}
              alignItems={'center'}
              marginRight={4}
              padding={'0.5rem 1rem'}
              borderRadius={'md'}
              fontSize={'2xl'}
              transition={'all 0.2s ease-out'}
              _hover={{ bg: 'gray.700', color: 'white' }}
              bg={selectedMenu === menu ? 'gray.800' : 'transparent'}
              color={selectedMenu === menu ? 'white' : 'inherit'}
              onClick={() => onSelectMenu(menu)}
            >
              {menu}
            </Box>
          ))}
        </Box>
      </Box>
      <Box>
        <Tooltip label={'새로운 그룹 메시지'} bg={'gray.900'} fontSize={'2xl'}>
          <Box as={'button'}>
            <ChatIcon color={'gray.300'} _hover={{ color: 'white' }} />
          </Box>
        </Tooltip>
        <Tooltip label={'로그아웃'} bg={'gray.900'} fontSize={'2xl'}>
          <Box as={'button'} ml={5} onClick={handleLogout}>
            <UnlockIcon color={'gray.300'} _hover={{ color: 'white' }} />
          </Box>
        </Tooltip>
      </Box>
    </Container>
  );
};

export default FriendTopMenu;
