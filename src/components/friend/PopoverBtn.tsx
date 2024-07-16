import { spacing } from '@/lib/constants/spacing';
import { Box } from '@chakra-ui/react';

interface PopoverButtonProps {
  onClick: () => void;
  label: string;
  bgColor?: string;
  hoverColor?: string;
  textColor?: string;
  hoverTextColor?: string;
}
const PopoverBtn = ({
  onClick,
  label,
  bgColor = 'black',
  hoverColor = 'purple.600',
  textColor = 'white',
  hoverTextColor = 'white',
}: PopoverButtonProps) => {
  return (
    <Box
      bg={bgColor}
      fontSize={'small'}
      p={spacing.padding}
      color={textColor}
      textAlign={'left'}
      _hover={{
        bg: hoverColor,
        color: hoverTextColor,
      }}
      onClick={onClick}
    >
      {label}
    </Box>
  );
};

export default PopoverBtn;
