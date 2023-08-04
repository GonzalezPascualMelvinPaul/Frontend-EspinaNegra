import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { LayoutRouter } from "../../router";
import { AgregarUser, EditarUser, IndexUsuarios, VerPerfil } from "../pages";
import { Configuracion } from "../pages/Configuracion";
import { useSelector } from "react-redux";

export const UsuariosRoutes = () => {
  const { user } = useSelector((state) => state.auth);

  function havePermision(roles) {
    return user && roles.includes(user.nombre_rol);
  }

  return (
    <Routes>
      <Route element={<LayoutRouter />}>
        <Route
          path="inicio"
          element={
            havePermision(["Administrador"]) ? (
              <IndexUsuarios />
            ) : (
              <Navigate to="/dashboard/inicio" />
            )
          }
        />
        <Route
          path="agregar"
          element={
            havePermision(["Administrador"]) ? (
              <AgregarUser />
            ) : (
              <Navigate to="/dashboard/inicio" />
            )
          }
        />
        <Route
          path="editar/:id"
          element={
            havePermision(["Administrador"]) ? (
              <EditarUser />
            ) : (
              <Navigate to="/dashboard/inicio" />
            )
          }
        />
        <Route path="perfil" element={<VerPerfil />} />
        <Route path="configuracion" element={<Configuracion />} />
        <Route path="/*" element={<Navigate to={"/usuario/inicio"} />} />
      </Route>
    </Routes>
  );
};
