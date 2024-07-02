import { ChatIcon } from '@chakra-ui/icons';
import { HiDotsVertical } from 'react-icons/hi';
import CommonBox from './CommonBox';

const FriendBox = ({
  id,
  name,
  onClickDM,
  onClickOptions,
}: {
  id: number;
  name: string;
  onClickDM?: () => void;
  onClickOptions?: () => void;
}) => (
  <CommonBox
    id={id}
    name={name}
    icon1={<ChatIcon color={'#A0AEC0'} />}
    icon2={<HiDotsVertical color={'#A0AEC0'} />}
    tooltipLabel1={'DM'}
    tooltipLabel2={'기타'}
    onClickIcon1={onClickDM}
    onClickIcon2={onClickOptions}
  />
);

export default FriendBox;
