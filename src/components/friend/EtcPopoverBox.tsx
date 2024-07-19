import { PopoverContent, PopoverBody, Stack } from '@chakra-ui/react';
import { spacing } from '@/lib/constants/spacing';
import { useHandleFriend } from '@/lib/hooks/handlers';
import PopoverBtn from './PopoverBtn';

interface EtcPopoverBoxProps {
  onClose: () => void;
  id: number;
}

const EtcPopoverBox = ({ onClose, id }: EtcPopoverBoxProps) => {
  const handleVoiceCall = () => {
    console.log('음성 통화 시작');
    onClose();
  };

  const handleVideoCall = () => {
    console.log('영상 통화 시작');
    onClose();
  };

  const deleteFriend = () => {
    deleteFriendRequestMutation({ member2Id: id });
    onClose();
  };

  const { deleteFriendRequestMutation } = useHandleFriend();

  return (
    <PopoverContent
      bg={'gray.900'}
      color={'white'}
      w={'200px'}
      borderColor={'transparent'}
      border={'0'}
      borderRadius={10}
      overflow={'hidden'}
      m={'3'}
      ml={20}
    >
      <PopoverBody p={'0'} m={spacing.gutter}>
        <Stack>
          <PopoverBtn onClick={handleVoiceCall} label={'음성 통화하기'} />
          <PopoverBtn onClick={handleVideoCall} label={'영상 통화하기'} />
          <PopoverBtn
            onClick={deleteFriend}
            label={'친구 삭제하기'}
            hoverColor={'red'}
            hoverTextColor={'white'}
          />
        </Stack>
      </PopoverBody>
    </PopoverContent>
  );
};
export default EtcPopoverBox;
