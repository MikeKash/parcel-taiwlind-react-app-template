import { BrowserRouter } from "react-router-dom";
import AppRouter from "./Router";

export function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}
