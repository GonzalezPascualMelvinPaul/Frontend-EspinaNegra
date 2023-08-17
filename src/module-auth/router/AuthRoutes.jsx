import { PublicRouter } from "../../router/PublicRouter";
import { LoginPage, RegisterPage } from "../pages";
import { Navigate, Route, Routes } from "react-router-dom";
export const AuthRoutes = () => {
  return (
    <PublicRouter>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="login" element={<RegisterPage />} />
        <Route path="/*" element={<Navigate to={"/auth/login"} />} />
      </Routes>
    </PublicRouter>
  );
};
