import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Checkbox,
  Stack,
  Text,
} from '@chakra-ui/react';
import useFriendStore from '@/lib/stores/useFriendStore';
import { IFriend } from '@/types/friend';
import { useAuthStore } from '@/lib/stores/useAuthStore';
import useHandleDmRoom from '@/lib/hooks/handlers/useHandleDmRoom';
import useDmStore from '@/lib/stores/useDmStore'; // Assuming useDmStore includes findRoomIdByUserNames

interface DmCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  modalPosition: { top: number; left: number | null; right: number | null };
}

const DmCreateModal = ({
  isOpen,
  onClose,
  modalPosition,
}: DmCreateModalProps) => {
  const navigate = useNavigate();
  const { friends } = useFriendStore();
  const { user } = useAuthStore();
  const [selectedFriends, setSelectedFriends] = useState<IFriend[]>([]);
  const { addDmRoomMutation } = useHandleDmRoom();
  const { findRoomIdByUserNames } = useDmStore();
  console.log('friends', friends);
  const handleFriendSelection = (friend: IFriend) => {
    setSelectedFriends((prev) => {
      const index = prev.findIndex((f) => f.friendId === friend.friendId);
      if (index > -1) {
        return prev.filter((f) => f.friendId !== friend.friendId);
      }
      return [...prev, friend];
    });
  };

  const handleDmRoom = () => {
    if (!user?.username) {
      console.error('User is not logged in');
      return;
    }

    const userNames = [...selectedFriends.map((f) => f.friendName)];
    const existingRoomId = findRoomIdByUserNames(userNames);
    console.log(existingRoomId);
    if (existingRoomId) {
      navigate(`/chat/main/${existingRoomId}`);
      onClose();
    } else {
      const dmName = [
        user.username,
        ...selectedFriends.map((f) => f.friendName),
      ].join(', ');
      addDmRoomMutation({
        roomName: dmName,
        userNames,
        roomId: 0,
        open: false,
        memberCount: 0,
        temporaryRoomName: '',
      });
      onClose();
    }
  };

  return (
    <Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          top={`${modalPosition?.top}px`}
          left={`${modalPosition?.left}px`}
          right={`${modalPosition?.right}px`}
          position={'absolute'}
          w={'20rem'}
        >
          <ModalHeader fontSize={'md'}>{'친구 선택하기'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {friends.length > 0 ? (
              <Stack>
                {friends.map((friend) => (
                  <Checkbox
                    colorScheme={'purple'}
                    fontSize={'sm'}
                    key={friend.friendId}
                    isChecked={selectedFriends.some(
                      (f) => f.friendId === friend.friendId,
                    )}
                    onChange={() => handleFriendSelection(friend)}
                  >
                    {friend.friendName}
                  </Checkbox>
                ))}
              </Stack>
            ) : (
              <Text>
                {
                  '친구가 존재하지 않습니다. 친구 신청을 통해 dizzyCode에서 소통하세요.'
                }
              </Text>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme={'purple'}
              onClick={handleDmRoom}
              width={'90vw'}
            >
              {'DM생성'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default DmCreateModal;
