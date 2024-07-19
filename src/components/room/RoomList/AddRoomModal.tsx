import { useHandleRoom } from '@/lib/hooks/handlers';
import { useAuthStore } from '@/lib/stores/useAuthStore';
import {
  Box,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

interface AddRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddRoomModal = ({ isOpen, onClose }: AddRoomModalProps) => {
  const username = useAuthStore((state) => state.user?.username);
  const [roomName, setRoomName] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const handlePrivacyChange = (value: string) => {
    setOpen(value === 'true');
  };

  useEffect(() => {
    setRoomName(`${username}'s room`);
  }, [username]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setRoomName(event.target.value);

  // add room
  const { addRoomMutation } = useHandleRoom();
  const handleSubmit = () => {
    addRoomMutation({ roomName, open });
    onClose();
    setRoomName(`${username}'s room`);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={'md'} isCentered>
      <ModalOverlay />
      <ModalContent p={'0.5rem'}>
        <ModalHeader />
        <ModalCloseButton size={'md'} />
        <ModalBody pt={'2rem'}>
          <Box>
            <Text fontWeight={'bold'} fontSize={'sm'} color={'gray.300'}>
              {'ROOM NAME'}
            </Text>
            <Input
              value={roomName}
              onChange={handleChange}
              placeholder={'방 이름을 입력하세요'}
              fontSize={'sm'}
              bg={'gray.900'}
              border={'none'}
              py={'3'}
            />
          </Box>
          <Box pt={'1.5rem'}>
            <Text
              fontWeight={'bold'}
              fontSize={'sm'}
              color={'gray.300'}
              pb={'1rem'}
            >
              {'공개 여부'}
            </Text>
            <RadioGroup onChange={handlePrivacyChange} value={open.toString()}>
              <Stack>
                <Radio value={'true'} size={'sm'} colorScheme={'white'}>
                  {'공개'}
                </Radio>
                <Radio value={'false'} size={'sm'} colorScheme={'white'}>
                  {'비공개'}
                </Radio>
              </Stack>
            </RadioGroup>
          </Box>
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
            {'방 만들기'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddRoomModal;
