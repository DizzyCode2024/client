import { ChevronDownIcon, CloseIcon } from '@chakra-ui/icons';
import { Box, Button, Menu, MenuButton, MenuList } from '@chakra-ui/react';
import RoomMenuItems from '../RoomList/RoomMenuItems';

const RoomMenuButton = ({ name }: { name: string }) => {
  return (
    <Menu>
      {({ isOpen }) => (
        <>
          <MenuButton
            isActive={isOpen}
            as={Button}
            rightIcon={isOpen ? <CloseIcon /> : <ChevronDownIcon />}
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
            h={'4rem'}
            w={'23rem'}
            color={'gray.200'}
            textAlign={'left'}
            pl={2}
            fontSize={'2xl'}
            transition={'all 0.2s ease-in'}
            boxShadow={'base'}
            bg={'transparent'}
            _hover={{ bg: 'gray.600', color: 'white' }}
            _expanded={{ bg: 'gray.600', color: 'white' }}
          >
            <Box ml={3} fontWeight={'bold'}>
              {name}
            </Box>
          </MenuButton>
          <MenuList ml={3}>
            <RoomMenuItems />
          </MenuList>
        </>
      )}
    </Menu>
  );
};

export default RoomMenuButton;
