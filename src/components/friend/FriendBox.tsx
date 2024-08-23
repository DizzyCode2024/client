import { ChatIcon } from '@chakra-ui/icons';
import { Popover, PopoverTrigger, Box } from '@chakra-ui/react';
import { HiDotsVertical } from 'react-icons/hi';
import { useOnClickDM } from '@/lib/hooks/explore/useOnClickDm';
import EtcPopoverBox from './EtcPopoverBox';
import CommonBox from './CommonBox';

interface FriendBoxProps {
  id: number;
  name: string;
  openPopoverId?: number | null;
  onOpenPopover?: (id: number) => void;
}

const FriendBox = ({
  id,
  name,
  openPopoverId,
  onOpenPopover,
}: FriendBoxProps) => {
  const isOpen = openPopoverId === id;
  const closePopover = () => onOpenPopover && onOpenPopover(0);
  const onClickDM = useOnClickDM();
  return (
    <CommonBox
      id={id}
      name={name}
      icon1={<ChatIcon color={'#A0AEC0'} />}
      icon2={
        <Popover
          isOpen={isOpen}
          onClose={closePopover}
          placement={'bottom'}
          closeOnBlur
        >
          <PopoverTrigger>
            <Box onClick={() => onOpenPopover && onOpenPopover(id)}>
              <HiDotsVertical color={'#A0AEC0'} />
            </Box>
          </PopoverTrigger>
          <EtcPopoverBox onClose={closePopover} id={id} />
        </Popover>
      }
      tooltipLabel1={'DM'}
      tooltipLabel2={'기타'}
      onClickIcon1={() => onClickDM(name)}
      onClickIcon2={() => onOpenPopover && onOpenPopover(id)}
    />
  );
};

export default FriendBox;
