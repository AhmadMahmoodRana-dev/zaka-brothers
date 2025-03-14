import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import ContextProvider from "./context/Context.jsx";

// Add dark class to root element based on theme
const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <BrowserRouter>
      <ContextProvider>
        <App />
      </ContextProvider>
    </BrowserRouter>
  </StrictMode>
);

// Update document class when theme changes
const updateDocumentClass = (theme) => {
  document.documentElement.classList.toggle("dark", theme === "dark");
};

// Initial theme setup
const savedTheme = localStorage.getItem("theme") || 
  (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
updateDocumentClass(savedTheme);

// Watch for theme changes
window.addEventListener("storage", (event) => {
  if (event.key === "theme") {
    updateDocumentClass(event.newValue);
  }
});
