import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import ProvidersWithRoot from "./providers";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ProvidersWithRoot />
  </React.StrictMode>
);
