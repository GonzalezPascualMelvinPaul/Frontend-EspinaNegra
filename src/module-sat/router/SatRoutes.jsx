import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { LayoutRouter } from "../../router";
import { Marbetes } from "../pages/marbetes";
import { Hologramas } from "../pages/hologramas";

export const SatRoutes = () => {
  const { user } = useSelector((state) => state.auth);

  function havePermision(roles) {
    return user && roles.includes(user.nombre_rol);
  }

  return (
    <Routes>
      <Route element={<LayoutRouter />}>
        <Route path="marbete" element={<Marbetes />} />
        <Route path="holograma" element={<Hologramas />} />

        <Route path="/*" element={<Navigate to={"/sat/marbete"} />} />
      </Route>
    </Routes>
  );
};
