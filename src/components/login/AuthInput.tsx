import React from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  InputProps,
} from '@chakra-ui/react';

interface CustomInputProps extends InputProps {
  label: string;
  errorMessage?: string;
  isInvalid?: boolean;
  onEnterPress?: () => void;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  errorMessage,
  isInvalid,
  onEnterPress,
  ...props
}) => {
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && onEnterPress) {
      onEnterPress();
    }
  };

  return (
    <FormControl mt={3} isInvalid={isInvalid}>
      <FormLabel fontSize={'xs'}>{label}</FormLabel>
      <Input
        rounded={'none'}
        variant={'filled'}
        bg={'gray.700'}
        size={'sm'}
        fontSize={'xs'}
        transition={'0.5s ease-in'}
        _hover={{ bg: 'gray.600' }}
        onKeyPress={handleKeyPress}
        {...props}
      />
      {isInvalid && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
    </FormControl>
  );
};

export default CustomInput;
