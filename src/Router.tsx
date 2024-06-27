import { BrowserRouter, Route, Routes } from 'react-router-dom';
import WelcomePage from '@/features/auth/pages/WelcomePage';
import LoggedRouter from './LoggedRouter';
import LoginPage from './features/auth/pages/LoginPage';
import SignupPage from './features/auth/pages/SignupPage';
import RequireAuth from './components/RequireAuth';
import RedirectIfLogged from './components/RedirectIfLogged';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<WelcomePage />} />
        <Route
          path={'/signup'}
          element={
            <RedirectIfLogged>
              <SignupPage />
            </RedirectIfLogged>
          }
        />
        <Route
          path={'/login'}
          element={
            <RedirectIfLogged>
              <LoginPage />
            </RedirectIfLogged>
          }
        />
        <Route
          path={'/chat/*'}
          element={
            <RequireAuth>
              <LoggedRouter />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
