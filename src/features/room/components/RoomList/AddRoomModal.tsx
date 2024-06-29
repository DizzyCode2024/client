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
import { useAuthStore } from '@/stores/useAuthStore';
import useHandleRoom from '../../hooks/useHandleRoom';

const AddRoomModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
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
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={'xl'} isCentered>
      <ModalOverlay />
      <ModalContent p={'0.5rem'}>
        <ModalHeader />
        <ModalCloseButton size={'xl'} />
        <ModalBody pt={'2rem'}>
          <Box>
            <Text fontWeight={'bold'} fontSize={'xl'} color={'gray.300'}>
              {'ROOM NAME'}
            </Text>
            <Input
              value={roomName}
              onChange={handleChange}
              fontSize={'2xl'}
              bg={'gray.900'}
              border={'none'}
              py={'10'}
            />
          </Box>
          <Box pt={'2rem'}>
            <Text
              fontWeight={'bold'}
              fontSize={'xl'}
              color={'gray.300'}
              pb={'1rem'}
            >
              {'공개 여부'}
            </Text>
            <RadioGroup onChange={handlePrivacyChange} value={open.toString()}>
              <Stack>
                <Radio value={'true'} size={'lg'} colorScheme={'white'}>
                  {'공개'}
                </Radio>
                <Radio value={'false'} size={'lg'} colorScheme={'white'}>
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
            fontSize={'xl'}
            _hover={{
              bg: 'transparent',
              color: 'white',
            }}
          >
            {'취소'}
          </Button>
          <Button fontSize={'xl'} onClick={handleSubmit}>
            {'방 만들기'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddRoomModal;
