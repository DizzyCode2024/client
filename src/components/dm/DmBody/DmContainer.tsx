import { getDmChats } from '@/lib/api/afterLogin/dmApi';
import useDmStore from '@/lib/stores/useDmStore';
import { Box } from '@chakra-ui/react';
import {
  QueryFunctionContext,
  QueryKey,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { useCallback, useEffect, useRef } from 'react';
import { IChat } from '@/types';
import ChatBox from '@/components/chat/ChatBody/ChatBox';
import { QUERY_KEYS } from '@/lib/api';
import NoDmUI from './NoDm';

const DmContainer = () => {
  const { currentDmId } = useDmStore();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery<IChat[], Error>({
      queryKey: QUERY_KEYS.DM_CHATS({
        roomId: 0,
        categoryId: 0,
        channelId: currentDmId,
      }),
      queryFn: ({
        pageParam = null,
      }: QueryFunctionContext<QueryKey, unknown>) =>
        getDmChats({
          dmRoomId: currentDmId,
          timestamp: pageParam as string | null,
        }),
      initialPageParam: null,
      getNextPageParam: (lastPage: IChat[]) => {
        if (lastPage.length > 0) {
          const lastMessage = lastPage[lastPage.length - 1];
          // console.log('lastMessage', lastMessage, lastPage.length);
          return lastMessage.timestamp;
        }
        return undefined;
      },
      enabled: !!currentDmId,
    });

  const handleScroll = useCallback(() => {
    const scrollContainer = scrollContainerRef.current;
    // console.log(hasNextPage);
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

  console.log('data', data);

  return data?.pages[0].length === 0 ? (
    <NoDmUI />
  ) : (
    <Box mt={'auto'} color={'white'} overflow={'hidden'} flex={1}>
      <Box
        height={'100%'}
        overflowY={'auto'}
        // ref={scrollContainerRef}
        display={'flex'}
        flexDirection={'column-reverse'}
        overflow={'scroll'}
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

export default DmContainer;
