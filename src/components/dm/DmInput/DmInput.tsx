/* eslint-disable react/jsx-props-no-spreading */
import { ArrowUpIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, HStack, Input } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useAuthStore } from '@/lib/stores/useAuthStore';
import useFilesStore from '@/lib/stores/useFileStore';
import { useFileHandler } from '@/lib/hooks/handlers';
import useStompClient from '@/lib/hooks/useStompClient';
import InputPlusBtn from '@/components/chat/ChatInput/InputPlusBtn';
import FilePreview from '@/components/chat/ChatInput/FilePreview';
import { useDestination } from '@/lib/hooks/useDestination';
import { ISendChatPayload } from '../../../types/chat';

const DmInput = () => {
  const { files, uploadedUrls, addFiles, removeFile, clearFiles } =
    useFilesStore();
  const { uploadAllFiles } = useFileHandler();
  const [content, setContent] = useState('');
  const senderId = useAuthStore((state) => state.user?.id);

  const { sendMessage } = useStompClient();
  const { DmDestination } = useDestination();

  console.log(uploadedUrls);
  const handleSendMessage = async () => {
    if (senderId && (content.trim() || files.length)) {
      if (files.length > 0) {
        files.forEach(async (_file, index) => {
          const payload: ISendChatPayload = {
            senderId,
            content: index === 0 ? content : '',
            url: uploadedUrls[index],
          };

          console.log('Sending message:', payload);
          console.log('ChatDestination', DmDestination);

          sendMessage(DmDestination, payload);
        });
      } else {
        const payload: ISendChatPayload = {
          senderId,
          content,
        };

        console.log('Sending message:', payload);
        sendMessage(DmDestination, payload);
      }

      setContent('');
      clearFiles();
    }
  };

  useEffect(() => {
    const uploadFiles = async () => {
      if (files.length > 0) {
        console.log('Uploading files:', files);
        await uploadAllFiles();
      }
    };

    if (files.length > 0) {
      uploadFiles();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

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
          placeholder={'#DM에 메시지 보내기'}
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

export default DmInput;
