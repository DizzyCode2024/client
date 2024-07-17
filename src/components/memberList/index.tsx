import { Box } from '@chakra-ui/react';
import List from './Base';

const dummyData = [
  {
    id: 1,
    name: '김땡땡',
    status: 'ONLINE',
  },
  {
    id: 2,
    name: '박땡땡',
    status: 'OFFLINE',
  },
  {
    id: 3,
    name: '정땡땡',
    status: 'ONLINE',
  },
  {
    id: 4,
    name: '이땡땡',
    status: 'OFFLINE',
  },
  {
    id: 5,
    name: '최땡땡',
    status: 'OFFLINE',
  },
];

const MemberList = () => {
  const onlineMembers = dummyData.filter(
    (member) => member.status === 'ONLINE',
  );

  const offlineMembers = dummyData.filter(
    (member) => member.status === 'OFFLINE',
  );

  return (
    <Box bg={'gray.800'}>
      <List type={'ONLINE'}>
        {onlineMembers.map((member) => (
          <List.Member key={member.id} name={member.name} />
        ))}
      </List>

      <List type={'OFFLINE'}>
        {offlineMembers.map((member) => (
          <List.Member key={member.id} name={member.name} />
        ))}
      </List>
    </Box>
  );
};

export default MemberList;
