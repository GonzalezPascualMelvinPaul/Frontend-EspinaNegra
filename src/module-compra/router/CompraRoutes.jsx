import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { LayoutRouter } from "../../router";
import { IndexCompra } from "../pages";
export const CompraRoutes = () => {
  return (
    <Routes>
      <Route element={<LayoutRouter />}>
        <Route path="inicio" element={<IndexCompra />} />
        <Route path="/*" element={<Navigate to={"/compra/inicio"} />} />
      </Route>
    </Routes>
  );
};
