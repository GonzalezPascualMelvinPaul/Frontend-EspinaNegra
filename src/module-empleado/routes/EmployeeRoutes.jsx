import { AgregarEmpleado, EditarEmpleado, EmployeePage } from "../pages";
import { Navigate, Route, Routes } from "react-router-dom";
import { EmployeeRouter } from "./EmployeeRouter";
import { LayoutRouter } from "../../router";
import { useSelector } from "react-redux";
export const EmployeeRoutes = () => {
  const { user } = useSelector((state) => state.auth);

  function havePermision(roles) {
    return user && roles.includes(user.nombre_rol);
  }
  return (
    <Routes>
      <Route element={<LayoutRouter />}>
        <Route path="inicio" element={<EmployeePage />} />
        <Route
          path="agregar"
          element={
            havePermision(["Administrador", "Gerente"]) ? (
              <AgregarEmpleado />
            ) : (
              <Navigate to="/empleado/inicio" />
            )
          }
        />
        <Route
          path="editar/:id"
          element={
            havePermision(["Administrador", "Gerente"]) ? (
              <EditarEmpleado />
            ) : (
              <Navigate to="/empleado/inicio" />
            )
          }
        />
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
