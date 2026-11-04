"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function SessionNotice() {
  const pathname = usePathname();
  const router = useRouter();
  const [estado, setEstado] = useState<
    "visitante" | "cliente" | "error" | null
  >(null);
  const [intento, setIntento] = useState(0);
  const [cerrando, setCerrando] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const solicitud = new AbortController();
    fetch("/api/sesion", { cache: "no-store", signal: solicitud.signal })
      .then((respuesta) => {
        if (respuesta.status === 204) setEstado("cliente");
        else if (respuesta.status === 401) setEstado("visitante");
        else setEstado("error");
      })
      .catch(() => {
        if (!solicitud.signal.aborted) setEstado("error");
      });
    return () => solicitud.abort();
  }, [pathname, intento]);

  if (estado === null) return null;

  return (
    <p className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-100">
      {estado === "error" ? (
        <>
          <span role="status">
            No se pudo comprobar la sesión. Comprueba la conexión e inténtalo de
            nuevo.
          </span>{" "}
          <button
            type="button"
            className="underline"
            onClick={() => setIntento((anterior) => anterior + 1)}
          >
            Reintentar
          </button>
        </>
      ) : estado === "cliente" ? (
        <>
          <span role="status">Sesión iniciada.</span>{" "}
          <button
            type="button"
            disabled={cerrando}
            className="underline"
            onClick={async () => {
              if (cerrando) return;
              setCerrando(true);
              setError(false);
              try {
                const respuesta = await fetch("/api/sesion", {
                  method: "DELETE",
                });
                if (respuesta.status !== 204) throw new Error();
                setEstado("visitante");
                router.replace("/login");
                router.refresh();
              } catch {
                setError(true);
              } finally {
                setCerrando(false);
              }
            }}
          >
            {cerrando ? "Cerrando sesión…" : "Cerrar sesión"}
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
