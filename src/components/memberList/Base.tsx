import { spacing } from '@/lib/constants';
import { Box, Flex, Text } from '@chakra-ui/react';
import { ReactNode, createContext, useContext } from 'react';

const ListTypeContext = createContext<'ONLINE' | 'OFFLINE' | undefined>(
  undefined,
);

const List = ({
  children,
  type,
}: {
  children: ReactNode;
  type: 'ONLINE' | 'OFFLINE';
}) => {
  return (
    <ListTypeContext.Provider value={type}>
      <Box color={'white'}>
        <Text
          px={spacing.padding}
          pt={spacing.padding}
          fontSize={'sm'}
          fontWeight={'bold'}
          color={'gray.300'}
        >
          {type}
        </Text>
        {children}
      </Box>
    </ListTypeContext.Provider>
  );
};

const Member = ({ name }: { name: string }) => {
  const type = useContext(ListTypeContext);
  return (
    <Flex
      alignItems={'center'}
      gap={spacing.small}
      py={spacing.small}
      pl={spacing.gutter}
      pr={'7rem'}
    >
      <Box
        w={3}
        h={3}
        borderRadius={'50%'}
        bg={type === 'ONLINE' ? 'green' : 'gray.300'}
      />
      <Text>{name}</Text>
    </Flex>
  );
};

List.Member = Member;

export default List;
