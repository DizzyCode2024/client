import { useState } from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
} from '@chakra-ui/react';

import useDmStore from '@/lib/stores/useDmStore';
import useFriendStore from '@/lib/stores/useFriendStore';
import useHandleDmRoom from '@/lib/hooks/handlers/useHandleDmRoom';

interface AddFriendModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddFriendModal = ({ isOpen, onClose }: AddFriendModalProps) => {
  const [selectedFriend, setSelectedFriend] = useState('');
  const { currentDmRoom } = useDmStore();
  const { friends } = useFriendStore();
  const { addMemberMutation } = useHandleDmRoom();
  console.log(selectedFriend);

  const toggleFriendSelection = (friendName: string) => {
    if (selectedFriend === friendName) {
      setSelectedFriend('');
    } else {
      setSelectedFriend(friendName);
    }
  };

  const handleAddFriend = () => {
    if (selectedFriend && currentDmRoom?.roomId) {
      addMemberMutation({
        roomId: currentDmRoom.roomId,
        username: selectedFriend,
      });
    }
    setSelectedFriend('');
    onClose();
  };

  const availableFriends = friends.filter(
    (friend) => !currentDmRoom?.userNames.includes(friend.friendName),
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{'dm에 친구 초대하기'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody display={'flex'} flexDirection={'column'}>
          {availableFriends.length > 0 ? (
            availableFriends.map((friend) => (
              <Button
                key={friend.friendId}
                onClick={() => toggleFriendSelection(friend.friendName)}
                bg={
                  selectedFriend === friend.friendName
                    ? 'purple.200'
                    : 'gray.100'
                }
                m={2}
                isDisabled={currentDmRoom?.userNames.includes(
                  friend.friendName,
                )}
                _hover={{ transform: 'scale(1.1)' }}
              >
                {friend.friendName}
              </Button>
            ))
          ) : (
            <Text>{'No friends available to add.'}</Text>
          )}
          <Button
            colorScheme={'purple'}
            onClick={handleAddFriend}
            disabled={!selectedFriend}
            mt={2}
            mb={2}
          >
            {'초대'}
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddFriendModal;
