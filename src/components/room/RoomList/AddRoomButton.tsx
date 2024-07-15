import { AddIcon } from '@chakra-ui/icons';
import { Button, useDisclosure } from '@chakra-ui/react';
import CustomTooltip from '@/components/shared/Tooltip';
import AddRoomModal from './AddRoomModal';

const AddRoomButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <CustomTooltip label={'방 추가하기'} placement={'right'}>
        <Button
          onClick={onOpen}
          m={'0.5rem auto'}
          h={'3rem'}
          w={'3rem'}
          borderRadius={'50%'}
          transition={'all 0.3s ease-in-out'}
          bg={'gray.700'}
          color={'green'}
          fontSize={'1rem'}
          _hover={{
            bg: 'green',
            borderRadius: '30%',
            color: 'white',
          }}
        >
          <AddIcon boxSize={3} />
        </Button>
      </CustomTooltip>
      <AddRoomModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default AddRoomButton;
