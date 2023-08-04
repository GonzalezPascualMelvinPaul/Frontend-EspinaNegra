import React from "react";
import { AgregarProducto, EditarProducto, IndexProducto } from "../pages";
import { LayoutRouter } from "../../router";
import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

export const ProductosRoutes = () => {
  const { user } = useSelector((state) => state.auth);

  function havePermision(roles) {
    return user && roles.includes(user.nombre_rol);
  }

  return (
    <Routes>
      <Route element={<LayoutRouter />}>
        <Route path="inicio" element={<IndexProducto />} />
        <Route
          path="agregar"
          element={
            havePermision(["Administrador", "Gerente"]) ? (
              <AgregarProducto />
            ) : (
              <Navigate to="/producto/inicio" />
            )
          }
        />
        <Route
          path="editar/:id"
          element={
            havePermision(["Administrador", "Gerente"]) ? (
              <EditarProducto />
            ) : (
              <Navigate to="/producto/inicio" />
            )
          }
        />
        <Route path="/*" element={<Navigate to={"/producto/inicio"} />} />
      </Route>
    </Routes>
  );
};
