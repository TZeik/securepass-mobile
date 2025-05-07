import React from "react";
import Navigation from "./navigation";
import { AccessProvider } from "./components/AccessContext";

export default function App() {
  return (
    <AccessProvider>
      <Navigation />
    </AccessProvider>
  );
}
