import { AddIcon } from '@chakra-ui/icons';
import { Menu, MenuButton, MenuList, IconButton } from '@chakra-ui/react';
import MenuItemWithIcon from '@/components/MenuItemWithIcon';
import { FaFileUpload } from 'react-icons/fa';

const InputPlusBtn = () => {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        isRound
        variant={'solid'}
        backgroundColor={'gray.500'}
        aria-label={'file-add'}
        icon={<AddIcon />}
        ml={4}
        mr={4}
      />
      <MenuList>
        <MenuItemWithIcon
          text={'파일업로드'}
          icon={FaFileUpload}
          colorScheme={'purple'}
          onClick={() => console.log('파일 업로드 실행')}
        />
      </MenuList>
    </Menu>
  );
};

export default InputPlusBtn;
