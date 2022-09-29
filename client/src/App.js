import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "pages/login";
import Register from "pages/register";
import Profile from "./components/Profile/Profile";
import ForgotPassword from "pages/forgot-password";
import PasswordReset from "pages/password-reset";
import NotFoundPage from "pages/404";
import Index from "./components/Index/Index";

function App() {
  return (
    <div className="antialiased">
      <Routes>
        <Route index element={<Index />} />
        <Route exact path="/profile/:username" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/password-reset/:token" element={<PasswordReset />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
