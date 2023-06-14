import { AgregarEmpleado, EditarEmpleado, EmployeePage } from "../pages";
import { Navigate, Route, Routes } from "react-router-dom";
import { EmployeeRouter } from "./EmployeeRouter";
import { LayoutRouter } from "../../router";
export const EmployeeRoutes = () => {
  return (
    <Routes>
      <Route element={<LayoutRouter />}>
        <Route path="inicio" element={<EmployeePage />} />
        <Route path="agregar" element={<AgregarEmpleado />} />
        <Route path="editar/:id" element={<EditarEmpleado />} />
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
