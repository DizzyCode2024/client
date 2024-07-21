import { Box, Image, Text, VStack, IconButton } from '@chakra-ui/react';
import { FaFileAlt } from 'react-icons/fa';
import { CloseIcon } from '@chakra-ui/icons';
import { IFile } from '@/types';

interface FilePreviewProps {
  file: IFile;
  onRemove: (file: IFile) => void;
}

const FilePreview = ({ file, onRemove }: FilePreviewProps) => {
  const isImage = file.type?.startsWith('image/');

  return (
    <VStack spacing={2} align={'center'} position={'relative'}>
      {isImage ? (
        <Image
          src={file.preview}
          alt={`preview of ${file.name}`}
          boxSize={'100px'}
          objectFit={'cover'}
        />
      ) : (
        <Box
          padding={2}
          borderRadius={'md'}
          bg={'gray.200'}
          boxSize={'100px'}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <FaFileAlt size={'24px'} color={'gray.600'} />
          <Text ml={2} fontSize={'sm'}>
            {file.name}
          </Text>
        </Box>
      )}
      <Text fontSize={'xs'} color={'gray.500'}>
        {file.name}
      </Text>
      <IconButton
        aria-label={'Remove file'}
        icon={<CloseIcon />}
        size={'sm'}
        position={'absolute'}
        top={1}
        right={1}
        onClick={() => onRemove(file)}
      />
    </VStack>
  );
};

export default FilePreview;
