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
import { AuthRouter, AuthRoutes } from "../auth/router";
import { EmployeeRouter, EmployeeRoutes } from "../employee/routes";
import { PrivateRouter } from "./PrivateRouter";
import { PublicRouter } from "./PublicRouter";
import { useCheckAuth } from "../hooks";

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
        <Route path="/*" element={<Navigate to="/empleado/inicio" />} />
      </Routes>
      {/* <RouterProvider router={routes} /> */}
    </>
  );
};
