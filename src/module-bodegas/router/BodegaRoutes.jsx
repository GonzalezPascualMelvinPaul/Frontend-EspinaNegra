import React from "react";
import { LayoutRouter } from "../../router";
import { Navigate, Route, Routes } from "react-router-dom";
import { AgregarBodega, EditarBodega, IndexBodega } from "../pages";
import { useSelector } from "react-redux";

export const BodegaRoutes = () => {
  const { user } = useSelector((state) => state.auth);

  function havePermision(roles) {
    return user && roles.includes(user.nombre_rol);
  }
  return (
    <Routes>
      <Route element={<LayoutRouter />}>
        <Route path="inicio" element={<IndexBodega />} />
        <Route
          path="agregar"
          element={
            havePermision(["Administrador", "Gerente"]) ? (
              <AgregarBodega />
            ) : (
              <Navigate to={"/bodega/inicio"} />
            )
          }
        />
        <Route
          path="editar/:id"
          element={
            havePermision(["Administrador", "Gerente"]) ? (
              <EditarBodega />
            ) : (
              <Navigate to={"/bodega/inicio"} />
            )
          }
        />
        <Route path="/*" element={<Navigate to={"/bodega/inicio"} />} />
      </Route>
    </Routes>
  );
};
