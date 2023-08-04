import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { LayoutRouter } from "../../router";
import { AgregarVenta, IndexVenta } from "../pages";
import { EditarVenta } from "../pages/EditarVenta";
import { useSelector } from "react-redux";

export const VentaRoutes = () => {
  const { user } = useSelector((state) => state.auth);

  function havePermision(roles) {
    return user && roles.includes(user.nombre_rol);
  }

  return (
    <Routes>
      <Route element={<LayoutRouter />}>
        <Route path="inicio" element={<IndexVenta />} />
        <Route
          path="editar/:id"
          element={
            havePermision(["Administrador", "Gerente"]) ? (
              <EditarVenta />
            ) : (
              <Navigate to="/venta/inicio" />
            )
          }
        />
        <Route
          path="agregar"
          element={
            havePermision(["Administrador", "Gerente"]) ? (
              <AgregarVenta />
            ) : (
              <Navigate to="/venta/inicio" />
            )
          }
        />
        <Route path="/*" element={<Navigate to={"/venta/inicio"} />} />
      </Route>
    </Routes>
  );
};
