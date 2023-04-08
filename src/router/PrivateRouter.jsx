import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { CheckingAuth } from "../ui";
import { useCheckAuth } from "../hooks";
import { useSelector } from "react-redux";

export const PrivateRouter = ({ children }) => {
  //const statuus = useCheckAuth();
  const { status } = useSelector((state) => state.auth);
  //console.log(statuus);
  /* if (status === "checking") {
    return <CheckingAuth />;
  } */

  const { pathname, search } = useLocation();
  const lastPath = pathname + search;

  useEffect(() => {
    localStorage.setItem("lastPath", lastPath);
  }, [lastPath]);

  const location = useLocation();
  console.log(location);
  sessionStorage.setItem("Location", location.pathname);

  return status !== "not-authenticated" ? (
    children
  ) : (
    <Navigate to={"/auth/login"} />
  );
};
