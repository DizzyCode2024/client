import { spacing } from '@/lib/constants';
import { convertUTC } from '@/lib/utils/convertUTC';
import { IChat } from '@/types';
import { Box, Flex, Text, useDisclosure, Image, Link } from '@chakra-ui/react';
import { FaFileAlt } from 'react-icons/fa';
import styled from 'styled-components';
import MemberModal from './MemberModal';

const ProfilePic = styled.div`
  width: 3rem;
  height: 3rem;
  background-color: #9f7aea;
  border-radius: 50%;
`;

const FileName = styled(Text)`
  width: 100%;
  white-space: pre-wrap;
`;

const ChatBox = ({ content, senderUsername, timestamp, url }: IChat) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const imageExtensions = [
    'jpg',
    'jpeg',
    'png',
    'gif',
    'webp',
    'PNG',
    'JPEG',
    'JPG',
    'WEBP',
    'GIF',
  ];
  const baseURL = import.meta.env.VITE_BASE_URL;

  const getFileNameWithExtension = (url: string) => {
    const pathParts = url.split('/uploads/')[1];
    if (!pathParts) return '';

    const fileName = pathParts.split('_')[0];
    const fileExtension = pathParts.split('.').pop();

    return `${fileName}.${fileExtension}`;
  };

  const fileNameWithExtension = url ? getFileNameWithExtension(url) : '';

  const isImageFile = url && imageExtensions.some((ext) => url.endsWith(ext));

  return (
    <Flex
      // alignItems={'center'}
      gap={'1rem'}
      px={spacing.gutter}
      my={spacing.small}
      py={spacing.small}
    >
      <ProfilePic onClick={onOpen} />
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
        {url ? (
          isImageFile ? (
            <Link
              href={`${baseURL}${url}`}
              download
              target={'_blank'}
              rel={'noopener noreferrer'}
            >
              <Image
                src={`${baseURL}${url}`}
                alt={'Uploaded image'}
                maxW={'200px'}
                maxH={'200px'}
                objectFit={'cover'}
                _hover={{ opacity: 0.8 }}
              />
            </Link>
          ) : (
            <Link
              href={`${baseURL}${url}`}
              download
              target={'_blank'}
              rel={'noopener noreferrer'}
            >
              <Flex
                alignItems={'center'}
                justifyContent={'center'}
                direction={'column'}
                bg={'gray.100'}
                w={'200px'}
                h={'200px'}
                borderRadius={'md'}
                border={'1px solid gray'}
              >
                <FaFileAlt size={50} color={'gray'} />
                <FileName
                  mt={3}
                  p={2}
                  fontSize={'sm'}
                  color={'gray.800'}
                  textAlign={'center'}
                >
                  {fileNameWithExtension
                    ? `${fileNameWithExtension}`
                    : '파일 다운로드'}
                </FileName>
              </Flex>
            </Link>
          )
        ) : null}
      </Box>
      <MemberModal
        isOpen={isOpen}
        onClose={onClose}
        username={senderUsername}
      />
    </Flex>
  );
};

export default ChatBox;
