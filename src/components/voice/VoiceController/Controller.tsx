import { spacing } from '@/lib/constants/spacing';
import { Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { Button, RedButton } from './Buttons';

interface ControllerProps {
  children: ReactNode;
}

const Controller = ({ children }: ControllerProps) => (
  <Flex
    gap={spacing.gutter}
    margin={'auto'}
    position={'absolute'}
    bottom={10}
    left={'50%'}
    transform={'translateX(-50%)'}
    p={spacing.gutter}
  >
    {children}
  </Flex>
);

Controller.Button = Button;
Controller.RedButton = RedButton;

export default Controller;
