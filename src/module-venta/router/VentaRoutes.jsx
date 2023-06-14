import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { LayoutRouter } from "../../router";
import { IndexVenta } from "../pages";

export const VentaRoutes = () => {
  return (
    <Routes>
      <Route element={<LayoutRouter />}>
        <Route path="inicio" element={<IndexVenta />} />
        <Route path="/*" element={<Navigate to={"/venta/inicio"} />} />
      </Route>
    </Routes>
  );
};
