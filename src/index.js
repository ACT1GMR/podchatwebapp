import React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";
import store from "./store/index";
import "../styles/main.scss";
import Box from "./pages";
import ErrorBoundary from "./pages/ErrorBoundary";

render(
  <Provider store={store}>
    <ErrorBoundary>
      <Box/>
    </ErrorBoundary>
  </Provider>,
  document.getElementById("app")
);
