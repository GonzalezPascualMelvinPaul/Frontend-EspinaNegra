import { JournalPage } from "../pages";
import { Navigate } from "react-router-dom";
export const JournalRoutes = [
  { path: "/", element: <JournalPage /> },
  {
    path: "/*",
    element: <Navigate to={'/'} />,
  },
];
