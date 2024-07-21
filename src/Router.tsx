import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RedirectIfLogged, RequireAuth } from '@/lib/api';
import LoggedRouter from './LoggedRouter';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import WelcomePage from './pages/WelcomePage';

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
