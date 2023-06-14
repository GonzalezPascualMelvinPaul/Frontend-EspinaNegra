import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { LayoutRouter } from "../../router";
import { IndexProduccion } from "../pages/IndexProduccion";

export const ProduccionRoutes = () => {
  return (
    <Routes>
      <Route element={<LayoutRouter />}>
        <Route path="inicio" element={<IndexProduccion />} />
        <Route path="/*" element={<Navigate to={"/produccion/inicio"} />} />
      </Route>
    </Routes>
  );
};
