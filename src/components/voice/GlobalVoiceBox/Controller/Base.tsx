import { Flex, Icon } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { IconType } from 'react-icons';
import CustomTooltip from '../../../shared/Tooltip';

export interface ButtonProps {
  onClick: () => void;
  label: string;
  icon: IconType;
}

const GlobalController = ({ children }: { children: ReactNode }) => {
  return <Flex justifyContent={'space-between'}>{children}</Flex>;
};

const Button = ({ onClick, label, icon }: ButtonProps) => (
  <CustomTooltip label={label} placement={'top'}>
    <Flex
      borderRadius={'10%'}
      px={'1rem'}
      py={'0.5rem'}
      justifyContent={'center'}
      alignItems={'center'}
      _hover={{ bg: 'gray.900' }}
      onClick={onClick}
      bg={'gray.700'}
    >
      <Icon as={icon} boxSize={4} color={'white'} />
    </Flex>
  </CustomTooltip>
);

GlobalController.Button = Button;
export default GlobalController;
