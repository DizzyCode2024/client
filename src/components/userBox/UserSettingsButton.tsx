import CustomTooltip from '@/components/shared/Tooltip';
import { useAuthActions } from '@/lib/hooks/useAuthActions';
import { SettingsIcon } from '@chakra-ui/icons';
import { Menu, MenuButton, MenuList } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { VscSignOut } from 'react-icons/vsc';
import MenuItemWithIcon from '../shared/MenuItemWithIcon';

const UserSettingsButton = () => {
  const MotionSettingsIcon = motion(SettingsIcon);

  const { signout } = useAuthActions();

  return (
    <Menu m={2}>
      <CustomTooltip label={'사용자 설정'}>
        <MenuButton as={'button'}>
          <MotionSettingsIcon
            mr={2}
            color={'gray.400'}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
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
