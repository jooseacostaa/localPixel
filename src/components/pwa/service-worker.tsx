"use client";

import { useEffect } from "react";

export default function ServiceWorker() {
  useEffect(() => {
    if (
      process.env.NODE_ENV !== "production" ||
      !window.isSecureContext ||
      !("serviceWorker" in navigator)
    )
      return;

    function registrar() {
      navigator.serviceWorker.register("/sw.js").catch((error) => {
        console.error(
          "No se pudo registrar el service worker de LocalPixel.",
          error,
        );
      });
    }

    if (document.readyState === "complete") registrar();
    else window.addEventListener("load", registrar, { once: true });

    return () => window.removeEventListener("load", registrar);
  }, []);

  return null;
}
