import { createRoot } from "react-dom/client";
import { App } from "./App";
import { AuthProvider } from "./context/AuthProvider";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
