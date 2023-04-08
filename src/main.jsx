import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { EspinaNegraApp } from "./EspinaNegraApp";
import "./styles.css";
import { Provider } from "react-redux";
import { store } from "./store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <EspinaNegraApp />
    </Provider>
  </React.StrictMode>
);
