import { Box } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { getDmMembers, QUERY_KEYS } from '@/lib/api';
import { IMember } from '@/types';
import useDmStore from '@/lib/stores/useDmStore';
import List from '../memberList/Base';

const DmMemberList = () => {
  const { currentDmId } = useDmStore();
  const { data } = useQuery<IMember[], Error>({
    queryKey: QUERY_KEYS.MEMBERS(currentDmId),
    queryFn: () => getDmMembers(currentDmId),
  });

  const onlineMembers = data?.filter((member) => member.status === 'online');
  const offlineMembers = data?.filter((member) => member.status === 'offline');

  return (
    <Box bg={'gray.800'}>
      {onlineMembers && onlineMembers?.length > 0 && (
        <List type={'ONLINE'}>
          {onlineMembers.map((member) => (
            <List.Member key={member.username} name={member.username} />
          ))}
        </List>
      )}
      {offlineMembers && offlineMembers?.length > 0 && (
        <List type={'OFFLINE'}>
          {offlineMembers.map((member) => (
            <List.Member key={member.username} name={member.username} />
          ))}
        </List>
      )}
    </Box>
  );
};

export default DmMemberList;
