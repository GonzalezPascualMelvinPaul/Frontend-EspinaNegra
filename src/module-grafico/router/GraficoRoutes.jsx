import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { LayoutRouter } from "../../router";
import { IndexGrafico } from "../pages";

export const GraficoRoutes = () => {
  return (
    <Routes>
      <Route element={<LayoutRouter />}>
        <Route path="inicio" element={<IndexGrafico />} />
        <Route path="/*" element={<Navigate to={"/grafico/inicio"} />} />
      </Route>
    </Routes>
  );
};
