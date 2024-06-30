import { Box, Flex, Text } from '@chakra-ui/react';
import styled from 'styled-components';
import { spacing } from '@/constants/spacing';
import { convertUTC } from '@/utils/convertUTC';
import { IReceiveChatPayload } from '../../types';

const ProfilePic = styled.div`
  width: 4rem;
  height: 4rem;
  background-color: green;
  border-radius: 50%;
`;

const ChatBox = ({
  content,
  senderUsername,
  timestamp,
}: IReceiveChatPayload) => {
  return (
    <Flex
      alignItems={'center'}
      gap={'1.5rem'}
      px={spacing.gutter}
      my={spacing.gutter}
      py={spacing.small}
    >
      <ProfilePic />
      <Box pb={2}>
        <Flex alignItems={'flex-end'} gap={3} pb={2}>
          <Text fontSize={'3xl'} fontWeight={'bold'}>
            {senderUsername}
          </Text>
          <Text color={'gray.400'} fontSize={'lg'} fontWeight={'bold'}>
            {convertUTC(timestamp)}
          </Text>
        </Flex>
        <Text>{content}</Text>
      </Box>
    </Flex>
  );
};

export default ChatBox;
