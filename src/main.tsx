import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Spinner } from "./components";

import { routerConfig } from "./data";

import "./styles/main.css";

const router = createBrowserRouter(routerConfig);

const root = createRoot(document.getElementById("root")!);

root.render(
  <StrictMode>
    <RouterProvider
      router={router}
      fallbackElement={<Spinner className="w-screen h-screen" />}
    />
  </StrictMode>
);
