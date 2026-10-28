"use client";

import { useEffect } from "react";

export default function Theme() {
  useEffect(() => {
    try {
      document.documentElement.dataset.theme =
        localStorage.getItem("localpixel-theme") === "dark" ? "dark" : "light";
    } catch {
      document.documentElement.dataset.theme = "light";
    }
  }, []);

  return null;
}
