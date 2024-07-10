import { Box } from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import React from 'react';
import useFilesStore from '@/stores/useFileStore';

const Container = ({ children }: { children: React.ReactNode }) => {
  const addFiles = useFilesStore((state) => state.addFiles);

  const onDrop = (acceptedFiles: any) => {
    addFiles(acceptedFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,

    noClick: true,
    noKeyboard: true,
  });

  return (
    <Box
      {...getRootProps()}
      width={'100%'}
      height={'100vh'}
      bg={'gray.600'}
      display={'flex'}
      flexDirection={'column'}
      position={'relative'}
    >
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <input {...getInputProps()} style={{ display: 'none' }} />
      {isDragActive && (
        <Box
          position={'absolute'}
          top={0}
          left={0}
          right={0}
          bottom={0}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
          zIndex={'overlay'}
          bg={'blackAlpha.800'}
        >
          <Box fontSize={'2xl'} color={'white'} fontWeight={'bold'}>
            {'파일 첨부하기'}
          </Box>
        </Box>
      )}
      {children}
    </Box>
  );
};

export default Container;
