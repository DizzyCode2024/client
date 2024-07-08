import { AddIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';

const InputPlusBtn = () => {
  return (
    <IconButton
      isRound
      variant={'solid'}
      backgroundColor={'gray.500'}
      aria-label={'file-add'}
      icon={<AddIcon />}
      ml={4}
      mr={4}
    />
  );
};

export default InputPlusBtn;
