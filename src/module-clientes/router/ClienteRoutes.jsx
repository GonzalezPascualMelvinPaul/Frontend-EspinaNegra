import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { LayoutRouter } from "../../router";
import { AgregarCliente, EditarCliente, IndexCliente } from "../pages";
import { useSelector } from "react-redux";

export const ClienteRoutes = () => {
  const { user } = useSelector((state) => state.auth);

  function havePermision(roles) {
    return user && roles.includes(user.nombre_rol);
  }
  return (
    <Routes>
      <Route element={<LayoutRouter />}>
        <Route path="inicio" element={<IndexCliente />} />
        <Route
          path="agregar"
          element={
            havePermision(["Administrador", "Gerente"]) ? (
              <AgregarCliente />
            ) : (
              <Navigate to="/cliente/inicio" />
            )
          }
        />
        <Route
          path="editar/:id"
          element={
            havePermision(["Administrador", "Gerente"]) ? (
              <EditarCliente />
            ) : (
              <Navigate to="/cliente/inicio" />
            )
          }
        />
        <Route path="/*" element={<Navigate to={"/cliente/inicio"} />} />
      </Route>
    </Routes>
  );
};
