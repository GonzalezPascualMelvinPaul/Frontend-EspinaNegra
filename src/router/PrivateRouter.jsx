import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { CheckingAuth } from "../ui";
import { useCheckAuth } from "../hooks";
import { useSelector } from "react-redux";

export const PrivateRouter = ({ children }) => {
  const { status } = useSelector((state) => state.auth);

  const { pathname, search } = useLocation();
  const lastPath = pathname + search;

  localStorage.setItem("lastPath", lastPath);
  const location = useLocation();

  sessionStorage.setItem("Location", location.pathname);

  if (status === "checking") {
    return <CheckingAuth />;
  }

  return status !== "not-authenticated" ? (
    children
  ) : (
    <Navigate to={"/auth/login"} />
  );
};
