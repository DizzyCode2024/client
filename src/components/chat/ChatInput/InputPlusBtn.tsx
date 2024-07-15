import { AddIcon } from '@chakra-ui/icons';
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
    }
    onClose();
  };

  return (
    <Menu isOpen={isOpen}>
      <MenuButton
        as={IconButton}
        isRound
        variant={'solid'}
        backgroundColor={'gray.500'}
        aria-label={'file-add'}
        icon={<AddIcon />}
        ml={4}
        mr={4}
        onClick={onOpen}
      />
      <MenuList>
        <MenuItem
          icon={<FaFileUpload />}
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
