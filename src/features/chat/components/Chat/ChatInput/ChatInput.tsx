import { Box, Input, HStack, Button } from '@chakra-ui/react';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import useStompClient from '@/features/chat/hooks/useStompClient';
import { useAuthStore } from '@/stores/useAuthStore';
import { ArrowUpIcon } from '@chakra-ui/icons';
import useFilesStore from '@/stores/useFileStore';
import { useDestination } from '../../../hooks/useDestination';
import { ISendChatPayload } from '../../../types';
import InputPlusBtn from './InputPlusBtn';
import FilePreview from './FilePreview';

const ChatInput = () => {
  const { files, addFiles, removeFile, clearFiles } = useFilesStore();

  const [content, setContent] = useState('');
  const senderId = useAuthStore((state) => state.user?.id);

  const { sendMessage } = useStompClient();
  const { destination } = useDestination();

  const handleSendMessage = () => {
    if (senderId && (content.trim() || files.length)) {
      const payload: ISendChatPayload = {
        senderId,
        content,
        ...(files.length > 0 && { files }),
      };
      console.log('Sending message:', payload);
      sendMessage(destination, payload);
      setContent('');
      clearFiles();
    }
  };

  const onDrop = (acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map((file) => ({
      ...file,
      preview: URL.createObjectURL(file),
    }));
    console.log('nf', newFiles);
    addFiles(newFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true,
  });

  return (
    <Box {...getRootProps()} mt={4} bg={'gray.700'}>
      <HStack gap={'0'}>
        <InputPlusBtn />
        <Input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && senderId && (content || files.length)) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
          variant={'filled'}
          placeholder={'#일반채팅에 메시지 보내기'}
          height={'5rem'}
          bg={'gray.700'}
          fontSize={'2xl'}
          borderRadius={'0'}
          color={'gray.100'}
          _hover={{
            bg: 'gray.600',
          }}
          flexGrow={1}
        />
        {files.length > 0 && (
          <Button
            onClick={handleSendMessage}
            colorScheme={'gray'}
            ml={2}
            mr={2}
            borderRadius={50}
          >
            <ArrowUpIcon height={'15px'} width={'15px'} />
          </Button>
        )}
      </HStack>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <input {...getInputProps()} style={{ display: 'none' }} />
      <HStack spacing={2}>
        {files.map((file) => (
          <FilePreview key={file.preview} file={file} onRemove={removeFile} />
        ))}
      </HStack>
    </Box>
  );
};

export default ChatInput;
