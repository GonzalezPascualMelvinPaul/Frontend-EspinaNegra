import React from "react";
import { AppRouter } from "./router";
import { HelmetProvider } from "react-helmet-async";
import ThemeProvider from "./theme";
import { StyledChart } from "./components/chart";

export const EspinaNegraApp = () => {
  return (
    <>
      <HelmetProvider>
        <ThemeProvider>
          <StyledChart />
          <AppRouter />
        </ThemeProvider>
      </HelmetProvider>
    </>
  );
};
