import { ChatIcon, StarIcon, UnlockIcon } from '@chakra-ui/icons';
import { Box, Tooltip } from '@chakra-ui/react';
import { useAuthActions } from '@/lib/hooks/useAuthActions';

const Container = ({ children }: { children: React.ReactNode }) => (
  <Box
    width={'100%'}
    display={'flex'}
    justifyContent={'space-between'}
    alignItems={'center'}
    bg={'gray.600'}
    color={'gray.100'}
    p={3}
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
          display={'flex'}
          alignItems={'center'}
          color={'white'}
          textAlign={'left'}
          paddingRight={3}
          fontSize={'md'}
          fontWeight={'bold'}
          borderRight={'1px'}
          borderRightColor={'gray.500'}
          borderRightWidth={'1px'}
        >
          <StarIcon marginRight={2} width={'1rem'} color={'gray.200'} />
          {'친구'}
        </Box>
        <Box display={'flex'} marginLeft={'2'}>
          {MenuList.map((menu) => (
            <Box
              as={'button'}
              key={menu}
              display={'flex'}
              alignItems={'center'}
              marginRight={1}
              padding={'0.2rem 0.5rem'}
              borderRadius={'md'}
              fontSize={'md'}
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
      <Box mr={2}>
        <Tooltip label={'새로운 그룹 메시지'} bg={'gray.900'} fontSize={'sm'}>
          <Box as={'button'}>
            <ChatIcon color={'gray.300'} _hover={{ color: 'white' }} />
          </Box>
        </Tooltip>
        <Tooltip label={'로그아웃'} bg={'gray.900'} fontSize={'sm'}>
          <Box as={'button'} ml={5} onClick={handleLogout}>
            <UnlockIcon color={'gray.300'} _hover={{ color: 'white' }} />
          </Box>
        </Tooltip>
      </Box>
    </Container>
  );
};

export default FriendTopMenu;
