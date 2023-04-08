import { useSelector } from "react-redux";
import { useCheckAuth } from "../hooks";
import { CheckingAuth } from "../ui";
import { Navigate } from "react-router-dom";

export const PublicRouter = ({ children }) => {
  // const statuus = useCheckAuth();
  const { status } = useSelector((state) => state.auth);
  //console.log(statuus);
  console.log(status);
  let ruta = sessionStorage.getItem("Location");
  return status !== "authenticated" ? children : <Navigate to={"/"} />;
};
