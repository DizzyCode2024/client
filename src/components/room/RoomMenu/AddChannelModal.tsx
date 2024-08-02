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
import { useState } from 'react';

import { useHandleChannel } from '@/lib/hooks/handlers';
import { CategoryId, ChannelType, RoomId } from '@/types';

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
  const [channelType, setChannelType] = useState<ChannelType>('CHAT');
  const handleChannelTypeChange = (value: string) => {
    setChannelType(value as ChannelType);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setChannelName(event.target.value);

  // add channel
  const { addChannelMutation } = useHandleChannel(roomId);

  const handleSubmit = () => {
    addChannelMutation({ roomId, categoryId, channelName, channelType });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={'md'} isCentered>
      <ModalOverlay />
      <ModalContent p={'0.2rem'}>
        <ModalHeader />
        <ModalCloseButton size={'md'} />
        <ModalBody pt={'2rem'}>
          <Box>
            <Text fontWeight={'bold'} fontSize={'sm'} color={'gray.300'}>
              {'CHANNEL NAME'}
            </Text>
            <Input
              value={channelName}
              onChange={handleChange}
              placeholder={'채널 이름을 입력하세요.'}
              fontSize={'sm'}
              bg={'gray.900'}
              border={'none'}
              py={'5'}
            />
          </Box>
          <Box pt={'2rem'}>
            <Text
              fontWeight={'bold'}
              fontSize={'sm'}
              color={'gray.300'}
              pb={'1rem'}
            >
              {'CHANNEL TYPE'}
            </Text>
            <RadioGroup onChange={handleChannelTypeChange} value={channelType}>
              <Stack>
                <Radio value={'CHAT'} size={'sm'} colorScheme={'white'}>
                  {'Chat'}
                </Radio>
                <Radio value={'VOICE'} size={'sm'} colorScheme={'white'}>
                  {'Voice'}
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
            fontSize={'md'}
            _hover={{
              bg: 'transparent',
              color: 'white',
            }}
          >
            {'취소'}
          </Button>
          <Button fontSize={'md'} onClick={handleSubmit}>
            {'채널 만들기'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddChannelModal;
