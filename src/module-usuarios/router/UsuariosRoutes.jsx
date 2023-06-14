import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { LayoutRouter } from "../../router";
import { AgregarUser, EditarUser, IndexUsuarios } from "../pages";

export const UsuariosRoutes = () => {
  return (
    <Routes>
      <Route element={<LayoutRouter />}>
        <Route path="inicio" element={<IndexUsuarios />} />
        <Route path="agregar" element={<AgregarUser />} />
        <Route path="editar/:id" element={<EditarUser />} />
        <Route path="/*" element={<Navigate to={"/usuario/inicio"} />} />
      </Route>
    </Routes>
  );
};
