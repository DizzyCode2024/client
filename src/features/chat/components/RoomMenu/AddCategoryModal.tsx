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
import useHandleCategory from '../../hooks/useHandleCategory';
import { RoomId } from '../../types';

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
    addCatMutation.mutate({ roomId, categoryName: catName });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={'xl'} isCentered>
      <ModalOverlay />
      <ModalContent p={'0.5rem'}>
        <ModalHeader />
        <ModalCloseButton size={'xl'} />
        <ModalBody pt={'2rem'}>
          <Text fontWeight={'bold'} fontSize={'xl'} color={'gray.300'}>
            {'CATEGORY NAME'}
          </Text>
          <Input
            value={catName}
            onChange={handleChange}
            placeholder={'카테고리 이름을 입력하세요.'}
            fontSize={'2xl'}
            bg={'gray.900'}
            border={'none'}
            py={'10'}
          />
        </ModalBody>

        <ModalFooter>
          <Button
            mr={3}
            onClick={onClose}
            bg={'transparent'}
            color={'white'}
            fontSize={'xl'}
            _hover={{
              bg: 'transparent',
              color: 'white',
            }}
          >
            {'취소'}
          </Button>
          <Button fontSize={'xl'} onClick={handleSubmit}>
            {'카테고리 만들기'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddCategoryModal;
