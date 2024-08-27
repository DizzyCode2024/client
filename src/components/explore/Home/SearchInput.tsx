import { spacing } from '@/lib/constants';
import { Button, Flex, Input } from '@chakra-ui/react';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const SearchInput = () => {
  const [value, setValue] = useState<string>('');

  const [, setSearchParams] = useSearchParams();

  const handleSubmit = () => {
    setSearchParams({ keyword: value });
  };

  return (
    <Flex
      mt={spacing.gutter}
      mb={spacing.offset}
      mx={'10rem'}
      alignItems={'center'}
      gap={spacing.padding}
    >
      <Input
        variant={'filled'}
        placeholder={'Explore communities and join them!'}
        height={'3rem'}
        bg={'gray.700'}
        fontSize={'md'}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onSubmit={handleSubmit}
      />
      <Button onClick={handleSubmit}>{'Search'}</Button>
    </Flex>
  );
};

export default SearchInput;
