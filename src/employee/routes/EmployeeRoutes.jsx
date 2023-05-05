import { EmployeePage } from "../pages";
import { Navigate, Route, Routes } from "react-router-dom";
import { EmployeeRouter } from "./EmployeeRouter";
export const EmployeeRoutes = () => {
  return (
    <Routes>
      <Route element={<EmployeeRouter />}>
        <Route path="inicio" element={<EmployeePage />} />
        <Route path="/*" element={<Navigate to="/empleado/inicio" />} />
      </Route>
    </Routes>
  );
};

/* = [
  { path: "/", element: <JournalPage /> },
  {
    path: "/*",
    element: <Navigate to={'/'} />,
  },
]; */
