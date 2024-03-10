import React, { StrictMode } from "react";

import { createRoot } from "react-dom/client";

import { BrowserRouter as Router } from "react-router-dom";

import { Provider } from "react-redux";

import { ToastContainer } from "react-toastify";

import store from "./store/store.js";

import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";

import "remixicon/fonts/remixicon.css";

import "react-toastify/dist/ReactToastify.css";

import "./index.css";

const root = createRoot(document.getElementById("root"));
root.render(
  // <StrictMode>
    <Router>
      <Provider store={store}>
        <ToastContainer
          position="top-right"
          closeOnClick
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
          theme="dark"
          autoClose={3000}
          hideProgressBar={false}
        />
        <App />
      </Provider>
    </Router>
  // </StrictMode>
);
