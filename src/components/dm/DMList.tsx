import { useRef, useState, useEffect } from 'react';
import {
  Box,
  Stack,
  Text,
  Tooltip,
  Spinner,
  useDisclosure,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { CloseIcon, SmallAddIcon, StarIcon } from '@chakra-ui/icons';
import useHandleDmRoom from '@/lib/hooks/handlers/useHandleDmRoom';
import useDmStore from '@/lib/stores/useDmStore';
import { IDmRoom } from '@/types/dm';
import { useAuthStore } from '@/lib/stores/useAuthStore';
import UserBox from '../userBox/UserBox';
import DmCreateModal from './DmCreateModal';

const Container = ({ children }: { children: React.ReactNode }) => (
  <Box
    width={'14rem'}
    height={'100vh'}
    bg={'gray.700'}
    display={'flex'}
    flexDirection={'column'}
  >
    {children}
  </Box>
);
const DMList = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const { useGetDmRoomsQuery, removeMemberMutation, deleteRoomMutation } =
    useHandleDmRoom();
  const { data: rooms, isLoading, isError, error } = useGetDmRoomsQuery();
  const { setDmRooms, dmRooms } = useDmStore();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLDivElement>(null);
  const [modalPosition, setModalPosition] = useState({
    top: 50,
    left: 250,
    right: null,
  });
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);

  const navigateToFriendList = () => {
    navigate(`/chat/main`);
  };

  const handleDmRoomSelect = (roomId: number) => {
    setSelectedRoomId(roomId);
    navigate(`/chat/main/${roomId}`);
  };

  useEffect(() => {
    if (btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      setModalPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        right: rect.right + window.scrollX,
      });
    }
  }, [isOpen]);

  useEffect(() => {
    if (rooms) {
      setDmRooms(rooms);
    }
  }, [rooms, setDmRooms]);

  if (isError)
    return (
      <Box>
        {'Error: '}
        {error.message}
      </Box>
    );

  const handleLeaveOrDeleteRoom = (room: IDmRoom) => {
    if (room.memberCount > 2) {
      removeMemberMutation({ roomId: room.roomId, username: user?.username });
    } else {
      deleteRoomMutation(room.roomId);
    }
  };

  return (
    <Container>
      <Stack
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        marginTop={2}
      >
        <Box
          as={'button'}
          bg={'gray.800'}
          width={'11.5rem'}
          height={'1.5rem'}
          color={'gray.400'}
          textAlign={'left'}
          paddingLeft={2}
          fontSize={'sm'}
          borderRadius={'3px'}
          transition={'all 0.2s ease-in'}
          _hover={{ bg: 'gray.900', color: 'white' }}
        >
          {'대화 찾기 또는 시작하기'}
        </Box>
        <Box
          as={'button'}
          display={'flex'}
          alignItems={'center'}
          ml={1}
          mr={1}
          width={'12.5rem'}
          height={'2rem'}
          color={'gray.400'}
          textAlign={'left'}
          pl={1}
          fontSize={'md'}
          borderRadius={'3px'}
          transition={'all 0.2s ease-in'}
          _hover={{ bg: 'gray.600', color: 'white' }}
          onClick={() => navigateToFriendList()}
        >
          <StarIcon width={'0.7rem'} mr={1} />
          {'친구'}
        </Box>
      </Stack>
      <Box
        color={'gray.400'}
        fontSize={'xs'}
        fontWeight={'bold'}
        margin={'10px'}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        onClick={onOpen}
      >
        {'다이렉트 메세지'}
        <Tooltip
          label={'DM 생성'}
          fontSize={'md'}
          placement={'top'}
          backgroundColor={'gray.900'}
        >
          <SmallAddIcon
            _hover={{ bg: 'gray.600', color: 'white', cursor: 'pointer' }}
          />
        </Tooltip>
      </Box>
      <Box>
        <DmCreateModal
          isOpen={isOpen}
          onClose={onClose}
          modalPosition={modalPosition}
        />
      </Box>
      {isLoading ? (
        <Spinner color={'white'} ml={'auto'} mr={'auto'} />
      ) : (
        dmRooms.map((room: IDmRoom) => (
          <Box
            key={room.roomId}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'space-between'}
            height={'3rem'}
            ml={1}
            mr={1}
            borderRadius={'3px'}
            bg={room.roomId === selectedRoomId ? 'gray.600' : 'transparent'}
            color={room.roomId === selectedRoomId ? 'white' : 'gray.300'}
            _hover={{
              bg: 'gray.600',
              color: 'white',
              cursor: 'pointer',
              '.close-icon': {
                display: 'flex',
              },
            }}
            onClick={() => handleDmRoomSelect(room.roomId)}
          >
            <Text marginLeft={'1rem'}>
              {room.roomName ? room.roomName : room.temporaryRoomName}
            </Text>
            <Box
              as={'button'}
              display={'none'}
              alignItems={'center'}
              justifyContent={'center'}
              className={'close-icon'}
              color={'gray.500'}
              _hover={{ color: 'white' }}
              onClick={(e) => {
                e.stopPropagation();
                handleLeaveOrDeleteRoom(room);
              }}
            >
              <CloseIcon w={2} h={2} mr={2} />
            </Box>
          </Box>
        ))
      )}
      <UserBox />
    </Container>
  );
};

export default DMList;
