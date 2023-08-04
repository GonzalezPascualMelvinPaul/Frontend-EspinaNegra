import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { LayoutRouter } from "../../router";
import { AgregarEnvasado, IndexEnvasado } from "../pages";
import { useSelector } from "react-redux";

export const EnvasadoRoutes = () => {
  const { user } = useSelector((state) => state.auth);

  function havePermision(roles) {
    return user && roles.includes(user.nombre_rol);
  }
  return (
    <Routes>
      <Route element={<LayoutRouter />}>
        <Route path="inicio" element={<IndexEnvasado />} />
        <Route
          path="agregar"
          element={
            havePermision(["Administrador", "Gerente"]) ? (
              <AgregarEnvasado />
            ) : (
              <Navigate to="/envasado/inicio" />
            )
          }
        />
        <Route path="/*" element={<Navigate to={"/envasado/inicio"} />} />
      </Route>
    </Routes>
  );
};
