import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { LayoutRouter } from "../../router";
import { IndexDashboard } from "../pages";

export const DashboardRoutes = () => {
  return (
    <Routes>
      <Route element={<LayoutRouter />}>
        <Route path="inicio" element={<IndexDashboard />} />
        <Route path="/*" element={<Navigate to={"/dashboard/inicio"} />} />
      </Route>
    </Routes>
  );
};
