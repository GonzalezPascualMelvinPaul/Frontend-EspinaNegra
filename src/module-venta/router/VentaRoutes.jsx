import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { LayoutRouter } from "../../router";
import { AgregarVenta, IndexVenta } from "../pages";
import { EditarVenta } from "../pages/EditarVenta";

export const VentaRoutes = () => {
  return (
    <Routes>
      <Route element={<LayoutRouter />}>
        <Route path="inicio" element={<IndexVenta />} />
        <Route path="editar/:id" element={<EditarVenta />} />
        <Route path="agregar" element={<AgregarVenta />} />
        <Route path="/*" element={<Navigate to={"/venta/inicio"} />} />
      </Route>
    </Routes>
  );
};
