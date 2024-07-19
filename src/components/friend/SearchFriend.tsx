import { useState } from 'react';
import { Box, Input, Button, FormControl } from '@chakra-ui/react';
import { useHandleFriend } from '@/lib/hooks/handlers';

const SearchFriend = () => {
  const { sendFriendRequestByIdMutation, sendFriendRequestByNameMutation } =
    useHandleFriend();
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSendRequest = () => {
    if (/^\d+$/.test(inputValue)) {
      sendFriendRequestByIdMutation({
        friendId: Number(inputValue),
      });
    } else {
      sendFriendRequestByNameMutation({
        friendName: inputValue,
      });
    }
    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendRequest();
    }
  };

  return (
    <Box marginLeft={4} marginTop={5}>
      <FormControl>
        <Input
          placeholder={'친구 아이디나 닉네임으로 요청하기'}
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          bg={'gray.800'}
          color={'gray.100'}
          width={'50vw'}
          height={'3rem'}
          fontSize={'sm'}
          border={'gray.500'}
          mb={3}
        />

        <Button
          bg={'purple.600'}
          height={'3rem'}
          color={'white'}
          fontSize={'sm'}
          _hover={{ bg: 'purple.700' }}
          onClick={handleSendRequest}
        >
          {'친구 요청 보내기'}
        </Button>
      </FormControl>
    </Box>
  );
};

export default SearchFriend;
