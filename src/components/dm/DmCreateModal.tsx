import { useState } from 'react';
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
  const { friends } = useFriendStore();
  const { user } = useAuthStore();
  const [selectedFriends, setSelectedFriends] = useState<IFriend[]>([]);
  const { addDmRoomMutation } = useHandleDmRoom();

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
    const dmName = [
      user?.username,
      ...selectedFriends.map((f) => f.friendName),
    ].join(', ');
    const userNames = [
      user?.username,
      ...selectedFriends.map((f) => f.friendName),
    ];
    console.log({ roomName: dmName, userNames });
    addDmRoomMutation({ roomName: dmName, userNames });
    onClose();
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
                  '친구가 존재하지 않습니다. 친구 신청을 통해 dizzyCode에서 소통하세요. '
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
