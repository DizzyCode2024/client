import { spacing } from '@/lib/constants';
import { convertUTC } from '@/lib/utils/convertUTC';
import { IChat } from '@/types';
import { Box, Flex, Text } from '@chakra-ui/react';
import styled from 'styled-components';

const ProfilePic = styled.div`
  width: 3rem;
  height: 3rem;
  background-color: #9f7aea;
  border-radius: 50%;
`;

const ChatBox = ({ content, senderUsername, timestamp }: IChat) => {
  return (
    <Flex
      alignItems={'center'}
      gap={'1rem'}
      px={spacing.gutter}
      my={spacing.small}
      py={spacing.small}
    >
      <ProfilePic />
      <Box pb={2}>
        <Flex alignItems={'flex-end'} gap={2} pb={2}>
          <Text fontSize={'md'} fontWeight={'bold'}>
            {senderUsername}
          </Text>
          <Text color={'gray.400'} fontSize={'xs'} fontWeight={'bold'}>
            {convertUTC(timestamp)}
          </Text>
        </Flex>
        <Text>{content}</Text>
      </Box>
    </Flex>
  );
};

export default ChatBox;
