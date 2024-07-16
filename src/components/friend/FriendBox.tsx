import { ChatIcon } from '@chakra-ui/icons';
import { Box, Popover, PopoverTrigger } from '@chakra-ui/react';
import { HiDotsVertical } from 'react-icons/hi';
import { useRef, useState } from 'react';

import CommonBox from './CommonBox';
import EtcPopoverBox from './EtcPopoverBox';

interface FriendBoxProps {
  id: number;
  name: string;
  onClickDM?: () => void;
}

const FriendBox = ({ id, name, onClickDM }: FriendBoxProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const initialFocusRef = useRef<HTMLButtonElement>(null);
  const openPopover = () => setIsOpen(true);
  const closePopover = () => setIsOpen(false);

  return (
    <CommonBox
      id={id}
      name={name}
      icon1={<ChatIcon color={'#A0AEC0'} />}
      icon2={
        <Popover
          isOpen={isOpen}
          initialFocusRef={initialFocusRef}
          onClose={closePopover}
          placement={'bottom'}
          closeOnBlur
        >
          <PopoverTrigger>
            <Box onClick={openPopover}>
              <HiDotsVertical color={'#A0AEC0'} />
            </Box>
          </PopoverTrigger>
          <EtcPopoverBox onClose={closePopover} id={id} />
        </Popover>
      }
      tooltipLabel1={'DM'}
      tooltipLabel2={'기타'}
      onClickIcon1={onClickDM}
      onClickIcon2={openPopover}
    />
  );
};

export default FriendBox;
