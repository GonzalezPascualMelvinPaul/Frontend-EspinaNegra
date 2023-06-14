import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { LayoutRouter } from "../../router";
import { AgregarProveedor, EditarProveedor, IndexProveedor } from "../pages";

export const ProveedorRoutes = () => {
  return (
    <Routes>
      <Route element={<LayoutRouter />}>
        <Route path="inicio" element={<IndexProveedor />} />
        <Route path="agregar" element={<AgregarProveedor />} />
        <Route path="editar/:id" element={<EditarProveedor />} />
        <Route path="/*" element={<Navigate to={"/proveedor/inicio"} />} />
      </Route>
    </Routes>
  );
};
