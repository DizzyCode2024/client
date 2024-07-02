import { QUERY_KEYS } from '@/api/queryKeys';
import useRoomStore from '@/stores/useRoomStore';
import { Box } from '@chakra-ui/react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useRef } from 'react';
import { getChats } from '../../api/chatApi';
import ChatBox from './ChatBox';
import { IReceiveChatPayload } from '../../types';

const ChatContainer = () => {
  const { currentChannelPath } = useRoomStore();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const { data, fetchNextPage, isFetchingNextPage, status, hasNextPage } =
    useInfiniteQuery({
      queryKey: QUERY_KEYS.CHATS(currentChannelPath),
      queryFn: ({ pageParam = null }) =>
        getChats({ ...currentChannelPath, timestamp: pageParam }),
      initialPageParam: null,
      getNextPageParam: (lastPage) => {
        if (lastPage.length > 0) {
          const lastMessage = lastPage[lastPage.length - 1];
          console.log('lastMessage', lastMessage, lastPage.length);
          return lastMessage.timestamp;
        }
        return undefined;
      },
    });

  const handleScroll = useCallback(() => {
    const scrollContainer = scrollContainerRef.current;
    console.log(hasNextPage);
    if (scrollContainer) {
      if (
        scrollContainer.scrollHeight -
          scrollContainer.clientHeight +
          scrollContainer.scrollTop <
          30 &&
        !isFetchingNextPage &&
        hasNextPage
      ) {
        fetchNextPage();
      }
    }
  }, [fetchNextPage, isFetchingNextPage, hasNextPage]);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, [handleScroll]);

  if (status === 'pending') {
    return <p>{'Loading...'}</p>;
  }

  if (status === 'error') {
    return <p>{'Error loading messages'}</p>;
  }

  return (
    <Box mt={'auto'} color={'white'} overflow={'hidden'}>
      <Box
        height={'100%'}
        overflowY={'auto'}
        ref={scrollContainerRef}
        display={'flex'}
        flexDirection={'column-reverse'}
        style={{
          overflowAnchor: 'auto',
        }}
      >
        {data?.pages.flatMap((page) =>
          page.map((chat: IReceiveChatPayload) => (
            <ChatBox
              key={chat.messageId}
              content={chat.content}
              senderUsername={chat.senderUsername}
              timestamp={chat.timestamp}
            />
          )),
        )}
        {isFetchingNextPage && <p>{'Loading more...'}</p>}
      </Box>
    </Box>
  );
};

export default ChatContainer;
