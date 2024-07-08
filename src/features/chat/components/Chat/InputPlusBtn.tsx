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
      ml={2}
      mr={2}
    />
  );
};

export default InputPlusBtn;
