import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
} from '@chakra-ui/react';

interface MemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  username: string;
}

const MemberModal = ({ isOpen, onClose, username }: MemberModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        backgroundColor={'gray.800'}
        color={'white'}
        borderRadius={'10'}
      >
        <ModalHeader backgroundColor={'black'}>{'사용자 정보'}</ModalHeader>
        <ModalCloseButton m={0} />
        <ModalBody>
          <Text fontSize={'md'}>
            {'이름: '}
            {username}
          </Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default MemberModal;
