import React from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import {NextUIProvider} from "@nextui-org/react";
import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(
  <>
  <NextUIProvider>
  <App />
  </NextUIProvider>
    
  </>
);
