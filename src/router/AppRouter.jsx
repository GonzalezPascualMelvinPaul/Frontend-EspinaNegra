import React from "react";
import {
  createBrowserRouter,
  createHashRouter,
  HashRouter,
  Navigate,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import { AuthRouter, AuthRoutes } from "../module-auth/router";
import { EmployeeRouter, EmployeeRoutes } from "../module-empleado/routes";
import { PrivateRouter } from "./PrivateRouter";
import { PublicRouter } from "./PublicRouter";
import { useCheckAuth } from "../hooks";
import { DashboardRoutes } from "../module-dashboard/router";
import { UsuariosRoutes } from "../module-usuarios/router";
import { ProductosRoutes } from "../module-productos/router";
import { BodegaRoutes } from "../module-bodegas/router";
import { InventarioRoutes } from "../module-inventarios/router";
import { ProveedorRoutes } from "../module-proveedor/router";
import { ClienteRoutes } from "../module-clientes/router";
import { CompraRoutes } from "../module-compra/router";
import { VentaRoutes } from "../module-venta/router";
import { EnvasadoRoutes } from "../module-envasado/router";
import { ProduccionRoutes } from "../module-produccion/router";
import { GraficoRoutes } from "../module-grafico/router";
import { SatRoutes } from "../module-sat/router";

/* const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRouter>
        <JournalRouter />
      </PrivateRouter>
    ),
    children: JournalRoutes,
  },
  {
    path: "auth/*",
    element: (
      <PublicRouter>
        <AuthRouter />
      </PublicRouter>
    ),
    children: AuthRoutes,
  },
]); */

export const AppRouter = () => {
  const { status } = useCheckAuth();
  return (
    <>
      <Routes>
        <Route path="/auth/*" element={<AuthRoutes />} />
        <Route
          path="/empleado/*"
          element={
            <PrivateRouter>
              <EmployeeRoutes />
            </PrivateRouter>
          }
        />
        <Route
          path="/dashboard/*"
          element={
            <PrivateRouter>
              <DashboardRoutes />
            </PrivateRouter>
          }
        />
        <Route
          path="/usuario/*"
          element={
            <PrivateRouter>
              <UsuariosRoutes />
            </PrivateRouter>
          }
        />
        <Route
          path="/producto/*"
          element={
            <PrivateRouter>
              <ProductosRoutes />
            </PrivateRouter>
          }
        />
        <Route
          path="/bodega/*"
          element={
            <PrivateRouter>
              <BodegaRoutes />
            </PrivateRouter>
          }
        />
        <Route
          path="/inventario/*"
          element={
            <PrivateRouter>
              <InventarioRoutes />
            </PrivateRouter>
          }
        />
        <Route
          path="/proveedor/*"
          element={
            <PrivateRouter>
              <ProveedorRoutes />
            </PrivateRouter>
          }
        />
        <Route
          path="/cliente/*"
          element={
            <PrivateRouter>
              <ClienteRoutes />
            </PrivateRouter>
          }
        />
        <Route
          path="/compra/*"
          element={
            <PrivateRouter>
              <CompraRoutes />
            </PrivateRouter>
          }
        />
        <Route
          path="/venta/*"
          element={
            <PrivateRouter>
              <VentaRoutes />
            </PrivateRouter>
          }
        />
        <Route
          path="/envasado/*"
          element={
            <PrivateRouter>
              <EnvasadoRoutes />
            </PrivateRouter>
          }
        />
        <Route
          path="/produccion/*"
          element={
            <PrivateRouter>
              <ProduccionRoutes />
            </PrivateRouter>
          }
        />
        <Route
          path="/grafico/*"
          element={
            <PrivateRouter>
              <GraficoRoutes />
            </PrivateRouter>
          }
        />
        <Route
          path="/sat/*"
          element={
            <PrivateRouter>
              <SatRoutes />
            </PrivateRouter>
          }
        />
        <Route path="/*" element={<Navigate to="/dashboard/inicio" />} />
      </Routes>
      {/* <RouterProvider router={routes} /> */}
    </>
  );
};
