import { useEffect, useState } from 'react';
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
import useDmStore from '@/lib/stores/useDmStore';
import { useHandleFriend } from '@/lib/hooks/handlers';

interface DmCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  modalPosition: { top: number; left: number; right: number };
}

const DmCreateModal = ({
  isOpen,
  onClose,
  modalPosition,
}: DmCreateModalProps) => {
  const navigate = useNavigate();

  const { user } = useAuthStore();
  const [selectedFriends, setSelectedFriends] = useState<IFriend[]>([]);
  const { addDmRoomMutation } = useHandleDmRoom();
  const { findRoomIdByUserNames } = useDmStore();
  const { useGetFriendsListQuery } = useHandleFriend();
  const { data } = useGetFriendsListQuery();
  const { setFriends } = useFriendStore();
  useEffect(() => {
    if (data) {
      setFriends(data);
    }
  }, [data, setFriends]);

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

    const userNames = [
      user.username,
      ...selectedFriends.map((f) => f.friendName),
    ];
    const existingRoomId = findRoomIdByUserNames(userNames);

    if (existingRoomId === undefined) {
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
    } else if (existingRoomId) {
      navigate(`/chat/main/${existingRoomId}`);
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
            {data && data.length > 0 ? (
              <Stack>
                {data.map((friend) => (
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
            {data && data.length > 0 ? (
              <Button
                colorScheme={'purple'}
                onClick={handleDmRoom}
                width={'90vw'}
              >
                {'DM 생성'}
              </Button>
            ) : (
              <Button
                colorScheme={'gray'}
                width={'90vw'}
                cursor={'not-allowed'}
              >
                {'DM 생성 불가'}
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default DmCreateModal;
