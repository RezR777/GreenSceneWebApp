import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import "./index.css";
import { EventsProvider } from "./context/EventContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <EventsProvider>
      <App />
      </EventsProvider>
    </AuthProvider>
  </StrictMode>
);
