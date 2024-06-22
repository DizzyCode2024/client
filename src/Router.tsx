import WelcomePage from "@/features/auth/pages/WelcomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./features/auth/pages/LoginPage";
import SignupPage from "./features/auth/pages/SignupPage";
import DMPage from "./features/chat/pages/DMPage";
import ServerPage from "./features/chat/pages/ServerPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/chat/main" element={<DMPage />} />
        <Route path="/chat/channels/:id" element={<ServerPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
