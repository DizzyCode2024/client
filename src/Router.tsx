import { BrowserRouter, Route, Routes } from "react-router-dom";
import WelcomePage from "@/features/auth/pages/WelcomePage";
import LoginPage from "./features/auth/pages/LoginPage";
import SignupPage from "./features/auth/pages/SignupPage";
import MainPage from "./features/chat/pages/MainPage";
import ChannelPage from "./features/chat/pages/Channel";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/chat/main" element={<MainPage />} />
        <Route path="/chat/channels/:id" element={<ChannelPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
