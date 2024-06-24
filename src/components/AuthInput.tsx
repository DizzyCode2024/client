import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  InputProps,
} from "@chakra-ui/react";

interface CustomInputProps extends InputProps {
  label: string;
  errorMessage?: string;
  isInvalid?: boolean;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  errorMessage,
  isInvalid,
  ...props
}) => {
  return (
    <FormControl mt={5} isInvalid={isInvalid}>
      <FormLabel>{label}</FormLabel>
      <Input
        rounded="none"
        variant="filled"
        bg="gray.700"
        size="lg"
        transition="0.5s ease-in"
        _hover={{ bg: "gray.600" }}
        {...props}
      />
      {isInvalid && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
    </FormControl>
  );
};

export default CustomInput;
