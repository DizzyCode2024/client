import { getMembers, QUERY_KEYS } from '@/lib/api';
import useRoomStore from '@/lib/stores/useRoomStore';
import { IMember } from '@/types';
import { Box } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import List from './Base';

const MemberList = () => {
  const {
    currentChannelPath: { roomId },
  } = useRoomStore();

  // get members
  const { data } = useQuery<IMember[], Error>({
    queryKey: QUERY_KEYS.MEMBERS(roomId),
    queryFn: () => getMembers(roomId),
  });

  const onlineMembers = data?.filter((member) => member.status === 'online');

  const offlineMembers = data?.filter((member) => member.status === 'offline');

  return (
    <Box bg={'gray.800'}>
      {onlineMembers && onlineMembers?.length > 0 && (
        <List type={'ONLINE'}>
          {onlineMembers?.map((member) => (
            <List.Member key={member.username} name={member.username} />
          ))}
        </List>
      )}
      {offlineMembers && offlineMembers?.length > 0 && (
        <List type={'OFFLINE'}>
          {offlineMembers?.map((member) => (
            <List.Member key={member.username} name={member.username} />
          ))}
        </List>
      )}
    </Box>
  );
};

export default MemberList;
