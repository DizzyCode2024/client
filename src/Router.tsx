import { BrowserRouter, Route, Routes } from "react-router-dom";
import WelcomePage from "@/features/auth/pages/WelcomePage";
import LoginPage from "./features/auth/pages/LoginPage";
import SignupPage from "./features/auth/pages/SignupPage";
import MainPage from "./features/chat/pages/MainPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/chat/main" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
