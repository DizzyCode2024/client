import useDmStore from '@/lib/stores/useDmStore';
import useFriendStore from '@/lib/stores/useFriendStore';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  Box,
  Image,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

interface MemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  username: string;
}

const MemberModal = ({ isOpen, onClose, username }: MemberModalProps) => {
  const findFriendByName = useFriendStore((state) => state.findFriendByName);
  const friend = findFriendByName(username);
  const navigate = useNavigate();
  const findRoomIdByUserNames = useDmStore(
    (state) => state.findRoomIdByUserNames,
  );

  const handleFriendClick = () => {
    const roomId = findRoomIdByUserNames([username]);

    if (roomId) {
      navigate(`/chat/main/${roomId}`);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        backgroundColor={'gray.700'}
        color={'white'}
        borderRadius={'10'}
      >
        <ModalHeader
          backgroundColor={'black'}
          borderTopLeftRadius={'10px'}
          borderTopRightRadius={'10px'}
        >
          {friend ? 'Friend' : 'User'}
        </ModalHeader>
        <ModalCloseButton m={0} />
        <ModalBody p={0}>
          <Box bg={'black'}>
            <Box
              bg={'gray.900'}
              w={'6rem'}
              h={'6rem'}
              borderRadius={'full'}
              border={'7px solid #2D3748'}
              overflow={'hidden'}
              ml={4}
            >
              <Image
                src={'/icon.jpeg'}
                alt={'user'}
                borderRadius={'full'}
                boxSize={'full'}
                objectFit={'cover'}
              />
            </Box>
          </Box>
          <Box mt={-8} mb={0} h={'2rem'} bg={'gray.700'} />
          <Text
            display={'flex'}
            alignItems={'center'}
            fontSize={'lg'}
            fontWeight={'bold'}
            m={4}
            pl={4}
            borderRadius={5}
            h={'3rem'}
            bg={'black'}
            onClick={handleFriendClick}
            _hover={{ color: ' purple.200', cursor: 'pointer' }}
          >
            {username}
          </Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default MemberModal;
