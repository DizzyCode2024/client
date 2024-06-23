import WelcomePage from "@/features/auth/pages/WelcomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoggedRouter from "./LoggedRouter";
import LoginPage from "./features/auth/pages/LoginPage";
import SignupPage from "./features/auth/pages/SignupPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/chat/*" element={<LoggedRouter />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
