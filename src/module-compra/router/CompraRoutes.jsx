import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { LayoutRouter } from "../../router";
import { AgregarCompra, EditarCompra, IndexCompra } from "../pages";
import { useSelector } from "react-redux";
export const CompraRoutes = () => {
  const { user } = useSelector((state) => state.auth);

  function havePermision(roles) {
    return user && roles.includes(user.nombre_rol);
  }
  return (
    <Routes>
      <Route element={<LayoutRouter />}>
        <Route path="inicio" element={<IndexCompra />} />
        <Route
          path="editar/:id"
          element={
            havePermision(["Administrador", "Gerente"]) ? (
              <EditarCompra />
            ) : (
              <Navigate to="/compra/inicio" />
            )
          }
        />
        <Route
          path="agregar"
          element={
            havePermision(["Administrador", "Gerente"]) ? (
              <AgregarCompra />
            ) : (
              <Navigate to="/compra/inicio" />
            )
          }
        />
        <Route path="/*" element={<Navigate to={"/compra/inicio"} />} />
      </Route>
    </Routes>
  );
};
