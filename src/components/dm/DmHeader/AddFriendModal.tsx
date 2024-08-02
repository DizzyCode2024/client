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
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useDmStore from '@/lib/stores/useDmStore';
import useFriendStore from '@/lib/stores/useFriendStore';
import { addMemberToRoomApi } from '@/lib/api';

const AddFriendModal = ({ isOpen, onClose }) => {
  const [selectedFriend, setSelectedFriend] = useState('');
  const { currentDmRoom } = useDmStore();
  const { friends } = useFriendStore();
  const queryClient = useQueryClient();
  console.log(selectedFriend);

  const { mutate: addMemberMutation } = useMutation({
    mutationFn: addMemberToRoomApi,
    onSuccess: () => {
      queryClient.invalidateQueries(['dmRooms']);
      onClose();
    },
    onError: (error) => {
      console.error('Failed to add member:', error);
    },
  });

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
