import { ButtonProps } from '@chakra-ui/react';
import BaseButton from './BaseButton';

export const Button = (
  props: Omit<ButtonProps, 'bgColor' | 'hoverBgColor' | 'bgColorOn'>,
) => (
  <BaseButton
    {...props}
    bgColor={'gray.700'}
    bgColorOn={'white'}
    hoverBgColor={'gray.900'}
  />
);

export const RedButton = (
  props: Omit<ButtonProps, 'bgColor' | 'hoverBgColor' | 'isOn'>,
) => (
  <BaseButton
    {...props}
    bgColor={'red.600'}
    hoverBgColor={'red.700'}
    isOn={false}
  />
);
