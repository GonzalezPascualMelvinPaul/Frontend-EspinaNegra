import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthRouter, AuthRoutes } from "../auth/router";
import { JournalRouter, JournalRoutes } from "../journal/routes";
import { PrivateRouter } from "./PrivateRouter";
import { PublicRouter } from "./PublicRouter";

const routes = createBrowserRouter([
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
]);

export const AppRouter = () => {
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
};
