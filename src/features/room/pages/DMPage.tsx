import DMList from '../components/DMList';
import FriendList from '../components/FriendList';
import MainContainer from '../../../components/MainContainer';

const DMPage = () => {
  return (
    <MainContainer>
      <DMList />
      <FriendList />
    </MainContainer>
  );
};

export default DMPage;
