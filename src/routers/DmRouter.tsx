import { Route, Routes } from 'react-router-dom';
import DMList from '../components/dm/DMList';
import MainContainer from '../components/shared/MainContainer';
import DMPage from '../pages/DMPage';
import FriendPage from '../pages/FriendPage';

const DmRouter = () => {
  return (
    <MainContainer>
      <DMList />
      <Routes>
        <Route path={'/'} element={<FriendPage />} />
        <Route path={'/:id'} element={<DMPage />} />
      </Routes>
    </MainContainer>
  );
};

export default DmRouter;
