import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { LayoutRouter } from "../../router";
import { AgregarProduccion, IndexProduccion } from "../pages";
import { useSelector } from "react-redux";

export const ProduccionRoutes = () => {
  const { user } = useSelector((state) => state.auth);

  function havePermision(roles) {
    return user && roles.includes(user.nombre_rol);
  }

  return (
    <Routes>
      <Route element={<LayoutRouter />}>
        <Route path="inicio" element={<IndexProduccion />} />
        <Route
          path="agregar"
          element={
            havePermision(["Administrador", "Gerente"]) ? (
              <AgregarProduccion />
            ) : (
              <Navigate to="/produccion/inicio" />
            )
          }
        />
        <Route path="/*" element={<Navigate to={"/produccion/inicio"} />} />
      </Route>
    </Routes>
  );
};
