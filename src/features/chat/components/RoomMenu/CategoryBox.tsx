import { AddIcon, ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Box } from '@chakra-ui/react';
import { useState } from 'react';
import CustomTooltip from '@/components/Tooltip';

const CategoryBox = ({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  return (
    <>
      <Box
        color={'gray.400'}
        fontSize={'xl'}
        fontWeight={'bold'}
        m={'10px'}
        mb={'2px'}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Box
          as={'button'}
          flex={'1'}
          display={'flex'}
          alignSelf={'flex-start'}
          alignItems={'center'}
          _hover={{ color: 'gray.100' }}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <ChevronDownIcon mr={1} /> : <ChevronRightIcon mr={1} />}
          {name}
        </Box>
        <CustomTooltip label={'채널 만들기'} placement={'top'}>
          <AddIcon
            boxSize={4}
            _hover={{ bg: 'gray.600', color: 'white', cursor: 'pointer' }}
          />
        </CustomTooltip>
      </Box>
      {isOpen ? children : null}
    </>
  );
};

export default CategoryBox;
