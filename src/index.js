import "./styles/theme.less";

import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";

import App from "./App";
import { StateProvider } from "./store";
import GlobalStyle from "./styles/globalStyle";
import theme from "./styles/theme";

ReactDOM.render(
  <React.StrictMode>
    <StateProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </StateProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
