import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { UserProvider } from "./context";
import { routerConfig } from "./data";

import "./styles/main.css";

const router = createBrowserRouter(routerConfig);

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </StrictMode>
);
