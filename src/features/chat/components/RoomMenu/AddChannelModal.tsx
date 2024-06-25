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
import useHandleChannel from '../../hooks/useHandleChannel';
import { CategoryId, RoomId } from '../../types';

const AddChannelModal = ({
  isOpen,
  onClose,
  roomId,
  categoryId,
}: {
  isOpen: boolean;
  onClose: () => void;
  roomId: RoomId;
  categoryId: CategoryId;
}) => {
  const [channelName, setChannelName] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setChannelName(event.target.value);

  // add channel
  const { addChannelMutation } = useHandleChannel(roomId);

  const handleSubmit = () => {
    addChannelMutation.mutate({ roomId, categoryId, channelName });
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
            {'CHANNEL NAME'}
          </Text>
          <Input
            value={channelName}
            onChange={handleChange}
            placeholder={'채널 이름을 입력하세요.'}
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
            {'채널 만들기'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddChannelModal;
