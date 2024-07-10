import MenuItemWithIcon from '@/components/MenuItemWithIcon';
import CustomTooltip from '@/components/Tooltip';
import { useAuthActions } from '@/features/auth/hooks/useAuthActions';
import { SettingsIcon } from '@chakra-ui/icons';
import { Menu, MenuButton, MenuList } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { VscSignOut } from 'react-icons/vsc';

const UserSettingsButton = () => {
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
        >
          <MotionSettingsIcon
            mr={5}
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
