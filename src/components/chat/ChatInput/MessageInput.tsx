/* eslint-disable react/jsx-props-no-spreading */
import { useFileHandler } from '@/lib/hooks/handlers';
import useFilesStore from '@/lib/stores/useFileStore';
import { ISendChatPayload } from '@/types';
import { ArrowUpIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, HStack, Input } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import FilePreview from './FilePreview';
import InputPlusBtn from './InputPlusBtn';

interface MessageInputProps {
  destination: string;
  senderId: ISendChatPayload['senderId'];
  placeholder: string;
  sendMessage: (destination: string, payload: ISendChatPayload) => void; // 메시지를 전송하는 함수
}

const MessageInput = ({
  destination,
  senderId,
  placeholder,
  sendMessage,
}: MessageInputProps) => {
  const { files, uploadedUrls, addFiles, removeFile, clearFiles } =
    useFilesStore();
  const { uploadAllFiles } = useFileHandler();
  const [content, setContent] = useState('');

  console.log('uploadedUrls', uploadedUrls);
  const handleSendMessage = async () => {
    if (senderId && (content.trim() || files.length)) {
      // 파일이 있을 경우
      let payload: ISendChatPayload;

      if (files.length > 0) {
        payload = {
          senderId,
          content,
          url: uploadedUrls,
        };
      } else {
        payload = {
          senderId,
          content,
        };
      }

      sendMessage(destination, payload);

      setContent('');
      clearFiles();
    }
  };

  useEffect(() => {
    const uploadFiles = async () => {
      if (files.length > 0) {
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
          placeholder={placeholder}
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

export default MessageInput;
