import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import CommonBox from './CommonBox';

const WaitingBox = ({
  id,
  name,
  onClickAccept,
  onClickReject,
}: {
  id: number;
  name: string;
  onClickAccept?: () => void;
  onClickReject?: () => void;
}) => (
  <CommonBox
    id={id}
    name={name}
    icon1={<CheckIcon color={'gray.400'} width={'1rem'} />}
    icon2={<CloseIcon color={'gray.400'} width={'1rem'} />}
    tooltipLabel1={'수락'}
    tooltipLabel2={'거절'}
    onClickIcon1={onClickAccept}
    onClickIcon2={onClickReject}
  />
);

export default WaitingBox;
