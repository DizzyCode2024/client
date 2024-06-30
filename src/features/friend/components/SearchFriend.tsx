import { Box, Input, Button, FormControl } from '@chakra-ui/react';

const SearchFriend = () => {
  return (
    <Box marginLeft={5} marginTop={5}>
      <FormControl>
        <Input
          placeholder={'친구 아이디나 닉네임으로 요청하기'}
          // value={friendId}
          // onChange={handleInputChange}
          bg={'gray.800'}
          color={'gray.100'}
          width={'50vw'}
          height={'4rem'}
          fontSize={'xl'}
          border={'gray.500'}
          mb={3}
        />

        <Button
          bg={'purple.600'}
          height={'4rem'}
          color={'white'}
          fontSize={'xl'}
          _hover={{ bg: 'purple.700' }}
        >
          {'친구 요청 보내기'}
        </Button>
      </FormControl>
    </Box>
  );
};

export default SearchFriend;
