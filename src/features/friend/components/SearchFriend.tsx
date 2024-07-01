import { useState } from 'react';
import { Box, Input, Button, FormControl } from '@chakra-ui/react';
import useHandleFriend from '../hooks/useHandleFriend';

const SearchFriend = () => {
  const { sendFriendRequestByIdMutation, sendFriendRequestByNameMutation } =
    useHandleFriend();
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSendRequest = () => {
    const senderId = 4;

    if (/^\d+$/.test(inputValue)) {
      sendFriendRequestByIdMutation({
        senderId,
        friendId: Number(inputValue),
      });
    } else {
      sendFriendRequestByNameMutation({
        senderId,
        friendName: inputValue,
      });
    }
  };

  return (
    <Box marginLeft={5} marginTop={5}>
      <FormControl>
        <Input
          placeholder={'친구 아이디나 닉네임으로 요청하기'}
          value={inputValue}
          onChange={handleInputChange}
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
          onClick={handleSendRequest}
        >
          {'친구 요청 보내기'}
        </Button>
      </FormControl>
    </Box>
  );
};

export default SearchFriend;
