import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { LayoutRouter } from "../../router";
import { IndexGasto } from "../pages";

export const GastoRoutes = () => {
  return (
    <Routes>
      <Route element={<LayoutRouter />}>
        <Route path="inicio" element={<IndexGasto />} />
        <Route path="/*" element={<Navigate to={"/gasto/inicio"} />} />
      </Route>
    </Routes>
  );
};
