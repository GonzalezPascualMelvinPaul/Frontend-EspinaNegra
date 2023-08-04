import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { LayoutRouter } from "../../router";
import { AgregarProveedor, EditarProveedor, IndexProveedor } from "../pages";
import { useSelector } from "react-redux";

export const ProveedorRoutes = () => {
  const { user } = useSelector((state) => state.auth);

  function havePermision(roles) {
    return user && roles.includes(user.nombre_rol);
  }

  return (
    <Routes>
      <Route element={<LayoutRouter />}>
        <Route path="inicio" element={<IndexProveedor />} />
        <Route
          path="agregar"
          element={
            havePermision(["Administrador", "Gerente"]) ? (
              <AgregarProveedor />
            ) : (
              <Navigate to="/proveedor/inicio" />
            )
          }
        />
        <Route
          path="editar/:id"
          element={
            havePermision(["Administrador", "Gerente"]) ? (
              <EditarProveedor />
            ) : (
              <Navigate to="/proveedor/inicio" />
            )
          }
        />
        <Route path="/*" element={<Navigate to={"/proveedor/inicio"} />} />
      </Route>
    </Routes>
  );
};
