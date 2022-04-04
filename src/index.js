import React from "react";
import ReactDom from "react-dom/client";
import "../styles/main.scss";
import Box from "./pages";
import ErrorBoundary from "./pages/ErrorBoundary";

const root = ReactDom.createRoot(document.getElementById("app"));
root.render(
  <ErrorBoundary>
    <Box/>
  </ErrorBoundary>
);