import React from "react";
import { AgregarProducto, EditarProducto, IndexProducto } from "../pages";
import { LayoutRouter } from "../../router";
import { Navigate, Route, Routes } from "react-router-dom";

export const ProductosRoutes = () => {
  return (
    <Routes>
      <Route element={<LayoutRouter />}>
        <Route path="inicio" element={<IndexProducto />} />
        <Route path="agregar" element={<AgregarProducto />} />
        <Route path="editar/:id" element={<EditarProducto />} />
        <Route path="/*" element={<Navigate to={"/producto/inicio"} />} />
      </Route>
    </Routes>
  );
};
