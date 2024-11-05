import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./context/AuthProvider.jsx";
import { CompanyProvider } from "./context/CompanyProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <CompanyProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CompanyProvider>
    </AuthProvider>
  </StrictMode>
);
