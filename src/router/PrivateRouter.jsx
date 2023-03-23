import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { CheckingAuth } from "../ui";
export const PrivateRouter = ({ children }) => {
  const logged = false;
  /* if (logged === true) {
    return <CheckingAuth />;
  } */

  const { pathname, search } = useLocation();
  const lastPath = pathname + search;

  useEffect(() => {
    localStorage.setItem("lastPath", lastPath);
  }, [lastPath]);

  return logged ? children : <Navigate to={"/auth/login"} />;
};
