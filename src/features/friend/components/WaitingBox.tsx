import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import CommonBox from './CommonBox';

const WaitingBox = ({
  id,
  name,
  onClickReject1,
  onClickReject2,
}: {
  id: number;
  name: string;
  onClickReject1?: () => void;
  onClickReject2?: () => void;
}) => (
  <CommonBox
    id={id}
    name={name}
    icon1={<CheckIcon color={'gray.400'} width={'1rem'} />}
    icon2={<CloseIcon color={'gray.400'} width={'1rem'} />}
    tooltipLabel1={'수락'}
    tooltipLabel2={'거절'}
    onClickIcon1={onClickReject1}
    onClickIcon2={onClickReject2}
  />
);

export default WaitingBox;
