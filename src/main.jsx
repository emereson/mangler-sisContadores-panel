// main.tsx or main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import App from "./App";
import "./index.css";
import { HashRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NextUIProvider className="w-screen h-screen flex flex-col   bg-white overflow-hidden ">
      <HashRouter>
        <App />
      </HashRouter>
    </NextUIProvider>
  </React.StrictMode>
);
