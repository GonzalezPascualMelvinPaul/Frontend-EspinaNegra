import React from "react";
import { LayoutRouter } from "../../router";
import { Navigate, Route, Routes } from "react-router-dom";
import { IndexInventario } from "../pages";

export const InventarioRoutes = () => {
  return (
    <Routes>
      <Route element={<LayoutRouter />}>
        <Route path="inicio" element={<IndexInventario />} />
        <Route path="/*" element={<Navigate to={"/inventario/inicio"} />} />
      </Route>
    </Routes>
  );
};
