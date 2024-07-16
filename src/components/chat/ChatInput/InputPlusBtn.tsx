import { AddIcon, Icon } from '@chakra-ui/icons';
import {
  Menu,
  MenuButton,
  MenuList,
  IconButton,
  MenuItem,
  Input,
  useDisclosure,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { FaFileUpload } from 'react-icons/fa';
import useFilesStore from '@/lib/stores/useFileStore';

const InputPlusBtn = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { addFiles } = useFilesStore();

  const handleFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const files = Array.from(event.target.files);
      addFiles(files);
      onClose();
    }
  };

  return (
    <Menu isOpen={isOpen} onClose={onClose}>
      <MenuButton
        as={IconButton}
        borderRadius={'full'}
        variant={'solid'}
        backgroundColor={'gray.500'}
        aria-label={'file-add'}
        icon={<Icon as={AddIcon} boxSize={3} />}
        ml={4}
        mr={4}
        boxSize={8}
        onClick={onOpen}
      />
      <MenuList>
        <MenuItem
          icon={<FaFileUpload />}
          color={'gray.300'}
          onClick={() => inputRef.current?.click()}
        >
          {'파일 업로드'}
        </MenuItem>
        <Input
          ref={inputRef}
          type={'file'}
          hidden
          multiple
          onChange={handleFiles}
        />
      </MenuList>
    </Menu>
  );
};

export default InputPlusBtn;
