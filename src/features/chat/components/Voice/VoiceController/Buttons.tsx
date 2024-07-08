import BaseButton, { ButtonProps } from './BaseButton';

export const Button = (
  props: Omit<ButtonProps, 'bgColor' | 'hoverBgColor'>,
) => <BaseButton {...props} bgColor={'gray.700'} hoverBgColor={'gray.900'} />;

export const RedButton = (
  props: Omit<ButtonProps, 'bgColor' | 'hoverBgColor'>,
) => <BaseButton {...props} bgColor={'red.600'} hoverBgColor={'red.700'} />;
