/* eslint-disable react/jsx-props-no-spreading */
import { ArrowUpIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, HStack, Input } from '@chakra-ui/react';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useAuthStore } from '@/lib/stores/useAuthStore';
import useFilesStore from '@/lib/stores/useFileStore';
import { useFileHandler } from '@/lib/hooks/handlers';
import useStompClient from '@/lib/hooks/useStompClient';
import { useDestination } from '@/lib/hooks/useDestination';
import { ISendChatPayload } from '@/types';
import FilePreview from './FilePreview';
import InputPlusBtn from './InputPlusBtn';

const ChatInput = () => {
  const { files, addFiles, removeFile, clearFiles } = useFilesStore();
  const { uploadAllFiles } = useFileHandler();
  const [content, setContent] = useState('');
  const senderId = useAuthStore((state) => state.user?.id);

  const { sendMessage } = useStompClient();
  const { ChatDestination } = useDestination();

  const handleSendMessage = async () => {
    if (senderId && (content.trim() || files.length)) {
      const payload: ISendChatPayload = {
        senderId,
        content,
        ...(files.length > 0 && { files }),
      };
      console.log('Sending message:', payload);
      sendMessage(ChatDestination, payload);
      setContent('');
      if (files.length > 0) {
        await uploadAllFiles();
        clearFiles();
      }
    }
  };

  const onDrop = (acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map((file) => ({
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      preview: URL.createObjectURL(file),
    }));
    addFiles(newFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true,
  });

  return (
    <Box {...getRootProps()} mt={4} bg={'gray.700'}>
      <Flex alignItems={'center'} justifyContent={'center'} height={'3.2rem'}>
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
          bg={'gray.700'}
          _hover={{ bg: 'gray.700' }}
          fontSize={'sm'}
          borderRadius={'0'}
          color={'gray.100'}
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
      </Flex>
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
