import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

    <App />

    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        duration: 3000,

        success: {
          style: {
            background: "#16a34a",
            color: "#fff",
          },
        },

        error: {
          style: {
            background: "#dc2626",
            color: "#fff",
          },
        },
      }}
    />

  </React.StrictMode>
);