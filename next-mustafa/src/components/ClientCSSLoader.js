"use client";

import { useEffect } from "react";

// This component loads CSS files client-side
export default function ClientCSSLoader() {
  useEffect(() => {
    // Dynamically load Bootstrap
    import("bootstrap/dist/css/bootstrap.min.css");
    
    // Dynamically load rsuite
    try {
      import("rsuite/dist/styles/rsuite-default.css");
    } catch (error) {
      console.warn("Failed to load rsuite styles:", error);
    }
  }, []);

  return null;
} 