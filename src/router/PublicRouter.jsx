import { CheckingAuth } from "../ui";
import { Navigate } from "react-router-dom";

export const PublicRouter = ({ children }) => {
  const logged = false;
  /* if (logged === true) {
    return <CheckingAuth />;
  } */

  return !logged ? children : <Navigate to="/" />;
  // return children;
};
