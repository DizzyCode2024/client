import { Box, Tooltip } from '@chakra-ui/react';
import { useState } from 'react';
import { CloseIcon, StarIcon } from '@chakra-ui/icons';
import IconWrapper from '@/components/IconWrapper';

const WaitingBox = ({ id, name }: { id: number; name: string }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      borderTop={'0.8px solid'}
      justifyContent={'space-between'}
      borderColor={'#5b697b'}
      width={'95%'}
      p={4}
      transition={'background-color 0.3s ease-in'}
      _hover={{ bg: 'gray.500', cursor: 'pointer' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Box display={'flex'} alignItems={'center'}>
        <IconWrapper>
          <StarIcon color={'gray.100'} />
        </IconWrapper>
        <Box fontWeight={'bold'} color={'white'} ml={4}>
          {name}{' '}
          {isHovered && (
            <Box
              as={'span'}
              color={'gray.400'}
              ml={2}
              fontSize={'xl'}
              transition={'background-color 0.3s ease-in'}
            >
              {id}
            </Box>
          )}
        </Box>
      </Box>
      <Box display={'flex'} alignItems={'center'}>
        <Tooltip
          label={'취소'}
          bg={'gray.900'}
          fontSize={'2xl'}
          placement={'top'}
          hasArrow
          arrowSize={15}
        >
          <Box>
            <IconWrapper>
              <CloseIcon color={'gray.400'} cursor={'pointer'} width={'1rem'} />
            </IconWrapper>
          </Box>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default WaitingBox;
