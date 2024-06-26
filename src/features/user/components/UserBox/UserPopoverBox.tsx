import {
  Box,
  Divider,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  Text,
} from '@chakra-ui/react';
import styled from 'styled-components';
import { spacing } from '@/constants/spacing';
import { useAuthStore } from '@/stores/useAuthStore';
import EditProfile from './EditButton';

const Top = styled.div`
  background-color: green;
  height: 7rem;
  position: relative;
  margin-bottom: 3rem;
`;

const UserPopoverBox = () => {
  const user = useAuthStore((state) => state.user);
  // console.log(user);
  return (
    <PopoverContent
      bg={'gray.900'}
      color={'white'}
      w={'300px'}
      borderColor={'transparent'}
      border={'0'}
      borderRadius={10}
      overflow={'hidden'}
      m={'3'}
      ml={20}
    >
      <PopoverHeader pt={4} fontWeight={'bold'} border={'0'} p={'0'}>
        <Top>
          <EditProfile />
          <Box
            bg={'gray.900'}
            w={'8rem'}
            h={'8rem'}
            borderRadius={'50%'}
            position={'absolute'}
            bottom={-35}
            left={10}
            p={3}
          >
            <Box
              bg={'green'}
              borderRadius={'50%'}
              w={'100%'}
              h={'100%'}
              overflow={'hidden'}
            >
              <img src={'/icon.jpeg'} alt={'user'} />
            </Box>
          </Box>
        </Top>
      </PopoverHeader>
      <PopoverBody m={'0'} p={'0'}>
        <Box
          bg={'black'}
          borderRadius={10}
          p={spacing.padding}
          m={spacing.gutter}
          fontSize={'small'}
        >
          <Text fontSize={'2xl'} fontWeight={'bold'}>
            {user ? user.username : '오프라인'}
          </Text>
          <Text>{user ? user.email : '오프라인'}</Text>
          <Divider borderColor={'gray.500'} w={'100%'} marginBlock={5} />
          <Text fontSize={'xl'} fontWeight={'bold'}>
            {'MEMBER SINCE'}
          </Text>
          <Text>{'May 27, 2024'}</Text>
        </Box>
      </PopoverBody>
    </PopoverContent>
  );
};

export default UserPopoverBox;
