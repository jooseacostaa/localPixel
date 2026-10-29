"use client";

import { useEffect, useRef, useState } from "react";

export default function AppearanceSettings() {
  const checkbox = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    try {
      if (checkbox.current)
        checkbox.current.checked =
          localStorage.getItem("localpixel-theme") === "dark";
    } catch {
      // La preferencia sigue funcionando aunque el navegador bloquee el almacenamiento.
    }
  }, []);

  return (
    <section>
      <h1>Configuración</h1>
      <p className="mt-3 text-slate-600 dark:text-slate-300">
        Ajusta la apariencia de LocalPixel.
      </p>
      <div className="mt-6 max-w-xl rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6">
        <h2 className="text-xl font-semibold">Apariencia</h2>
        <label className="mt-5 flex min-h-11 cursor-pointer items-center gap-3">
          <input
            ref={checkbox}
            type="checkbox"
            className="h-5 w-5 accent-blue-600"
            onChange={(event) => {
              const theme = event.target.checked ? "dark" : "light";
              document.documentElement.dataset.theme = theme;
              try {
                localStorage.setItem("localpixel-theme", theme);
                setMessage("Preferencia guardada en este navegador.");
              } catch {
                setMessage(
                  "Tema aplicado. El navegador no permite guardar la preferencia.",
                );
              }
            }}
          />
          Modo oscuro
        </label>
        <p
          role="status"
          className="mt-3 text-sm text-slate-600 dark:text-slate-300"
        >
          {message}
        </p>
      </div>
    </section>
  );
}
