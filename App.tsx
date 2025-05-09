import React from "react";
import Navigation from "./Navigation";
import { AccessProvider } from "./components/AccessContext";

export default function App() {
  return (
    <AccessProvider>
      <Navigation />
    </AccessProvider>
  );
}
