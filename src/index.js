import React from "react";
import {render} from "react-dom";
import "../styles/main.scss";
import Box from "./pages";
import ErrorBoundary from "./pages/ErrorBoundary";

render(
    <ErrorBoundary>
      <Box/>
    </ErrorBoundary>,
  document.getElementById("app")
);
