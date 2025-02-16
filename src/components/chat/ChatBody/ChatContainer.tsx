import { QUERY_KEYS, getChats } from '@/lib/api';
import useRoomStore from '@/lib/stores/useRoomStore';
import { Box } from '@chakra-ui/react';
import {
  QueryFunctionContext,
  QueryKey,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { useCallback, useEffect, useRef } from 'react';
import { IChat } from '@/types';
import ChatBox from './ChatBox';
import NoChatUI from './NoChat';

const ChatContainer = () => {
  const { currentChannelPath } = useRoomStore();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery<IChat[], Error>({
      queryKey: QUERY_KEYS.CHATS(currentChannelPath),
      queryFn: ({
        pageParam = null,
      }: QueryFunctionContext<QueryKey, unknown>) =>
        getChats({
          ...currentChannelPath,
          timestamp: pageParam as string | null,
        }),
      initialPageParam: null,
      getNextPageParam: (lastPage: IChat[]) => {
        if (lastPage.length > 0) {
          const lastMessage = lastPage[lastPage.length - 1];
          return lastMessage.timestamp;
        }
        return undefined;
      },
      enabled: currentChannelPath.channelId !== 0,
    });

  const handleScroll = useCallback(() => {
    const scrollContainer = scrollContainerRef.current;
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

  return data?.pages[0].length === 0 ? (
    <NoChatUI />
  ) : (
    <Box mt={'auto'} color={'white'} overflow={'hidden'} flex={1}>
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
          page.map((chat: IChat) => (
            <ChatBox
              key={chat.messageId}
              content={chat.content}
              senderUsername={chat.senderUsername}
              timestamp={chat.timestamp}
              url={chat.url}
            />
          )),
        )}
        {isFetchingNextPage && <p>{'Loading more...'}</p>}
      </Box>
    </Box>
  );
};

export default ChatContainer;
