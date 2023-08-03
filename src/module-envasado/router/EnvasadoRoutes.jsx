import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { LayoutRouter } from "../../router";
import { AgregarEnvasado, IndexEnvasado } from "../pages";

export const EnvasadoRoutes = () => {
  return (
    <Routes>
      <Route element={<LayoutRouter />}>
        <Route path="inicio" element={<IndexEnvasado />} />
        <Route path="agregar" element={<AgregarEnvasado />} />
        <Route path="/*" element={<Navigate to={"/envasado/inicio"} />} />
      </Route>
    </Routes>
  );
};
