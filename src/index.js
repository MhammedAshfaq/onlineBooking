import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthContextProvider } from "./context/authContext";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

if (process.env.NODE_ENV === "production") disableReactDevTools();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
    <Toaster />
  </Router>
);
