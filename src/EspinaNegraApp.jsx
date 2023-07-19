import React from "react";
import { AppRouter } from "./router";
import { HelmetProvider } from "react-helmet-async";
import ThemeProvider from "./theme";
import { StyledChart } from "./components/chart";
import ScrollToTop from "./components/scroll-to-top/ScrollToTop";

export const EspinaNegraApp = () => {
  return (
    <>
      <HelmetProvider>
        <ThemeProvider>
          <ScrollToTop />
          <StyledChart />
          <AppRouter />
        </ThemeProvider>
      </HelmetProvider>
    </>
  );
};
