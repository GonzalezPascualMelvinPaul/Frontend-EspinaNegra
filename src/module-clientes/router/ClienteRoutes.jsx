import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { LayoutRouter } from "../../router";
import { AgregarCliente, EditarCliente, IndexCliente } from "../pages";

export const ClienteRoutes = () => {
  return (
    <Routes>
      <Route element={<LayoutRouter />}>
        <Route path="inicio" element={<IndexCliente />} />
        <Route path="agregar" element={<AgregarCliente />} />
        <Route path="editar/:id" element={<EditarCliente />} />
        <Route path="/*" element={<Navigate to={"/cliente/inicio"} />} />
      </Route>
    </Routes>
  );
};
