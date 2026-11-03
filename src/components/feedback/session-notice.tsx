"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function SessionNotice() {
  const [estado, setEstado] = useState<"visitante" | "cliente" | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const solicitud = new AbortController();
    fetch("/api/sesion", { cache: "no-store", signal: solicitud.signal })
      .then((respuesta) => {
        if (respuesta.status === 204) setEstado("cliente");
        if (respuesta.status === 401) setEstado("visitante");
      })
      .catch(() => {});
    return () => solicitud.abort();
  }, []);

  if (estado === null) return null;

  return (
    <p className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-100">
      {estado === "cliente" ? (
        <>
          Sesión iniciada.{" "}
          <button
            type="button"
            className="underline"
            onClick={async () => {
              setError(false);
              try {
                const respuesta = await fetch("/api/sesion", {
                  method: "DELETE",
                });
                if (respuesta.status !== 204) throw new Error();
                window.location.reload();
              } catch {
                setError(true);
              }
            }}
          >
            Cerrar sesión
          </button>
          {error && <span role="alert"> No se pudo cerrar la sesión.</span>}
        </>
      ) : (
        <>
          No has iniciado sesión.{" "}
          <Link href="/login" className="underline">
            Iniciar sesión
          </Link>
        </>
      )}
    </p>
  );
}
