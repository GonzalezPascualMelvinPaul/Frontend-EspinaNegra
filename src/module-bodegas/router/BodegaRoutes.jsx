import React from "react";
import { LayoutRouter } from "../../router";
import { Navigate, Route, Routes } from "react-router-dom";
import { AgregarBodega, EditarBodega, IndexBodega } from "../pages";

export const BodegaRoutes = () => {
  return (
    <Routes>
      <Route element={<LayoutRouter />}>
        <Route path="inicio" element={<IndexBodega />} />
        <Route path="agregar" element={<AgregarBodega />} />
        <Route path="editar/:id" element={<EditarBodega />} />
        <Route path="/*" element={<Navigate to={"/bodega/inicio"} />} />
      </Route>
    </Routes>
  );
};
