import CustomTooltip from '@/components/Tooltip';
import { spacing } from '@/constants/spacing';
import { Flex, Icon } from '@chakra-ui/react';
import { IconType } from 'react-icons';

export interface ButtonProps {
  onClick: () => void;
  label: string;
  icon: IconType;
  bgColor: string;
  bgColorOn?: string;
  hoverBgColor: string;
  isOn: boolean;
}

const BaseButton = ({
  onClick,
  label,
  icon,
  bgColor,
  bgColorOn,
  hoverBgColor,
  isOn,
}: ButtonProps) => (
  <CustomTooltip label={label} placement={'top'}>
    <Flex
      borderRadius={'50%'}
      bg={isOn ? bgColorOn : bgColor}
      color={isOn ? 'black' : 'white'}
      p={spacing.gutter}
      justifyContent={'center'}
      alignItems={'center'}
      _hover={{ bg: isOn ? 'white' : hoverBgColor }}
      onClick={onClick}
    >
      <Icon as={icon} boxSize={8} />
    </Flex>
  </CustomTooltip>
);

export default BaseButton;
