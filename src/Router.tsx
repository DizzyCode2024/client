import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "@/features/chat/pages/MainPage";
import LoginPage from "./features/auth/pages/LoginPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
