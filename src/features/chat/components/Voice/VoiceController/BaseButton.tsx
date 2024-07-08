import CustomTooltip from '@/components/Tooltip';
import { spacing } from '@/constants/spacing';
import { Flex, Icon } from '@chakra-ui/react';
import { IconType } from 'react-icons';

export interface ButtonProps {
  onClick: () => void;
  label: string;
  icon: IconType;
  bgColor: string;
  hoverBgColor: string;
}

const BaseButton = ({
  onClick,
  label,
  icon,
  bgColor,
  hoverBgColor,
}: ButtonProps) => (
  <CustomTooltip label={label} placement={'top'}>
    <Flex
      borderRadius={'50%'}
      bg={bgColor}
      color={'white'}
      p={spacing.gutter}
      justifyContent={'center'}
      alignItems={'center'}
      _hover={{ bg: hoverBgColor }}
      onClick={onClick}
    >
      <Icon as={icon} boxSize={8} />
    </Flex>
  </CustomTooltip>
);

export default BaseButton;
