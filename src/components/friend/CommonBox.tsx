import { Box, Tooltip } from '@chakra-ui/react';
import { useState, ReactNode } from 'react';
import { StarIcon } from '@chakra-ui/icons';
import IconWrapper from '@/components/shared/IconWrapper';

interface CommonBoxProps {
  id: number;
  name: string;
  icon1: ReactNode;
  icon2: ReactNode;
  tooltipLabel1: string;
  tooltipLabel2: string;
  onClickIcon1?: () => void;
  onClickIcon2?: () => void;
}

const CommonBox = ({
  id,
  name,
  icon1,
  icon2,
  tooltipLabel1,
  tooltipLabel2,
  onClickIcon1,
  onClickIcon2,
}: CommonBoxProps) => {
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
          {name}
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
          label={tooltipLabel1}
          bg={'gray.900'}
          fontSize={'2xl'}
          placement={'top'}
          hasArrow
          arrowSize={15}
        >
          <Box
            onClick={onClickIcon1}
            _hover={{ bg: 'whiteAlpha.300' }}
            cursor={'pointer'}
            borderRadius={'full'}
            p={2}
          >
            <IconWrapper>{icon1}</IconWrapper>
          </Box>
        </Tooltip>
        <Tooltip
          label={tooltipLabel2}
          bg={'gray.900'}
          fontSize={'2xl'}
          placement={'top'}
          hasArrow
          arrowSize={15}
        >
          <Box
            onClick={onClickIcon2}
            _hover={{ bg: 'whiteAlpha.300' }}
            cursor={'pointer'}
            borderRadius={'full'}
            p={2}
          >
            <IconWrapper>{icon2}</IconWrapper>
          </Box>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default CommonBox;
