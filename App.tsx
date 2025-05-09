import React from "react";
import Navigation from "./src/navigation/Navigation";
import { AccessProvider } from "./src/components/main/AccessContext";

export default function App() {
  return (
    <AccessProvider>
      <Navigation />
    </AccessProvider>
  );
}
