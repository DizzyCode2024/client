import MenuItemWithIcon from '@/components/MenuItemWithIcon';
import { MdDeleteForever } from 'react-icons/md';
import { RiFileAddFill } from 'react-icons/ri';
import { VscSignOut } from 'react-icons/vsc';
import useRoomStore from '@/stores/useRoomStore';
import { MenuDivider, useDisclosure } from '@chakra-ui/react';
import useHandleRoom from '../../hooks/useHandleRoom';
import AddCategoryModal from '../RoomMenu/AddCategoryModal';

const RoomMenuItems = () => {
  const roomId = useRoomStore((state) => state.currentRoomId);
  const { leaveRoomMutation, deleteRoomMutation } = useHandleRoom();

  const {
    isOpen: isAddCatModalOpen,
    onOpen: onAddCatModalOpen,
    onClose: onAddCatModalClose,
  } = useDisclosure();
  return (
    <>
      {/* <MenuItemWithIcon text={'친구 초대하기'} icon={MdPersonAddAlt1} /> */}
      {/* <MenuItemWithIcon text={'서버 설정'} icon={IoMdSettings} /> */}
      <MenuItemWithIcon
        text={'카테고리 추가'}
        icon={RiFileAddFill}
        onClick={onAddCatModalOpen}
      />
      <AddCategoryModal
        isOpen={isAddCatModalOpen}
        onClose={onAddCatModalClose}
        roomId={roomId}
      />
      <MenuDivider />
      {/* <MenuItemWithIcon text={'알림 on/off'} icon={FaBell} /> */}
      <MenuItemWithIcon
        text={'방 나가기'}
        icon={VscSignOut}
        isRed
        onClick={() => {
          leaveRoomMutation(roomId);
        }}
      />
      <MenuDivider />
      <MenuItemWithIcon
        text={'방 삭제하기'}
        icon={MdDeleteForever}
        isRed
        onClick={() => {
          deleteRoomMutation(roomId);
        }}
      />
    </>
  );
};

export default RoomMenuItems;
