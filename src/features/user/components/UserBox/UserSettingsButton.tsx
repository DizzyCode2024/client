import MenuItemWithIcon from '@/components/MenuItemWithIcon';
import CustomTooltip from '@/components/Tooltip';
import { useAuthActions } from '@/features/auth/hooks/useAuthActions';
import { SettingsIcon } from '@chakra-ui/icons';
import { Menu, MenuButton, MenuList, keyframes } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { VscSignOut } from 'react-icons/vsc';

const UserSettingsButton = () => {
  const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

  const MotionSettingsIcon = motion(SettingsIcon);

  const { signout } = useAuthActions();

  return (
    <Menu>
      <CustomTooltip label={'사용자 설정'}>
        <MenuButton
          as={'button'}
          display={'flex'}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
          _hover={{ animation: `${spin} 1s linear infinite` }}
        >
          <MotionSettingsIcon mr={5} color={'gray.400'} />
        </MenuButton>
      </CustomTooltip>
      <MenuList ml={'-3rem'} mb={'1rem'}>
        <MenuItemWithIcon
          text={'로그아웃'}
          icon={VscSignOut}
          colorScheme={'red'}
          onClick={() => signout()}
        />
      </MenuList>
    </Menu>
  );
};

export default UserSettingsButton;
