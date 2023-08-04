import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { LayoutRouter } from "../../router";
import { AgregarCliente, EditarCliente, IndexCliente } from "../pages";
import { useSelector } from "react-redux";

export const ClienteRoutes = () => {
  const { user } = useSelector((state) => state.auth);

  function tienePermiso(roles) {
    // función ficticia para obtener el usuario actual
    return user && roles.includes(user.nombre_rol);
  }
  return (
    <Routes>
      <Route element={<LayoutRouter />}>
        <Route path="inicio" element={<IndexCliente />} />
        <Route
          path="agregar"
          element={
            tienePermiso(["Administrador", "Gerente"]) ? (
              <AgregarCliente />
            ) : (
              <Navigate to="/cliente/inicio" />
            )
          }
        />
        <Route path="editar/:id" element={<EditarCliente />} />
        <Route path="/*" element={<Navigate to={"/cliente/inicio"} />} />
      </Route>
    </Routes>
  );
};
