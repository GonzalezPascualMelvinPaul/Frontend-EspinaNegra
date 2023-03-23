import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { EspinaNegraApp } from "./EspinaNegraApp";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <EspinaNegraApp />
    </HashRouter>
  </React.StrictMode>
);
