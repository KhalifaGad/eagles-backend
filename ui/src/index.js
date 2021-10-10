import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Providers from "./HOCs/Providers";
import { ToastsContainer, ToastsStore } from "react-toasts";
import { BrowserRouter } from "react-router-dom";

import "./normalize.css";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Providers.User>
        <Providers.Theme>
          <App />
          <ToastsContainer store={ToastsStore} />
        </Providers.Theme>
      </Providers.User>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
