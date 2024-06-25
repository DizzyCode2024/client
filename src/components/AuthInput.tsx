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
  onEnterPress?: () => void; // 엔터 키를 처리할 함수
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  errorMessage,
  isInvalid,
  onEnterPress,
  ...props // onEnterPress를 제외한 나머지 props
}) => {
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && onEnterPress) {
      onEnterPress(); // 엔터 키 입력시 onEnterPress 호출
    }
  };

  return (
    <FormControl mt={5} isInvalid={isInvalid}>
      <FormLabel>{label}</FormLabel>
      <Input
        rounded={'none'}
        variant={'filled'}
        bg={'gray.700'}
        size={'lg'}
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
