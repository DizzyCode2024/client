import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';

import { useHandleCategory } from '@/lib/hooks/handlers';
import { RoomId } from '../../../types/room';

const AddCategoryModal = ({
  isOpen,
  onClose,
  roomId,
}: {
  isOpen: boolean;
  onClose: () => void;
  roomId: RoomId;
}) => {
  const [catName, setCatName] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setCatName(event.target.value);

  // add category
  const { addCatMutation } = useHandleCategory();

  const handleSubmit = () => {
    addCatMutation({ roomId, categoryName: catName });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={'md'} isCentered>
      <ModalOverlay />
      <ModalContent p={'0.2rem'}>
        <ModalHeader />
        <ModalCloseButton size={'md'} />
        <ModalBody pt={'2rem'}>
          <Text fontWeight={'bold'} fontSize={'sm'} color={'gray.300'}>
            {'CATEGORY NAME'}
          </Text>
          <Input
            value={catName}
            onChange={handleChange}
            placeholder={'카테고리 이름을 입력하세요.'}
            fontSize={'sm'}
            bg={'gray.900'}
            border={'none'}
            py={'5'}
          />
        </ModalBody>

        <ModalFooter>
          <Button
            mr={3}
            onClick={onClose}
            bg={'transparent'}
            color={'white'}
            fontSize={'sm'}
            _hover={{
              bg: 'transparent',
              color: 'white',
            }}
          >
            {'취소'}
          </Button>
          <Button fontSize={'sm'} onClick={handleSubmit}>
            {'카테고리 만들기'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddCategoryModal;
