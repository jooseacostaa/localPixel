"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import OrderForm from "@/components/orders/order-form";

type Pedido = {
  id: number;
  nombre: string;
  dominioDeseado: string;
  descripcion: string;
  servicios: { id: number; nombre: string }[];
};

type Resultado =
  | { estado: "cargando" | "sinSesion" | "error" }
  | { estado: "listo"; pedidos: Pedido[] };

export default function Pages() {
  const [busqueda, setBusqueda] = useState({ nombre: "" });
  const [resultado, setResultado] = useState<Resultado>({ estado: "cargando" });
  const [editando, setEditando] = useState<Pedido | null>(null);
  const [eliminando, setEliminando] = useState<number | null>(null);
  const [mensaje, setMensaje] = useState("");
  const [errorOperacion, setErrorOperacion] = useState("");
  const titulo = useRef<HTMLHeadingElement>(null);
  const ultimoEditado = useRef<number | null>(null);
  const restaurarFoco = useRef(false);

  useEffect(() => {
    if (!restaurarFoco.current || editando || resultado.estado !== "listo")
      return;
    const boton =
      ultimoEditado.current === null
        ? null
        : document.getElementById(`editar-pedido-${ultimoEditado.current}`);
    (boton ?? titulo.current)?.focus();
    restaurarFoco.current = false;
  }, [editando, resultado]);

  function recargar() {
    setResultado({ estado: "cargando" });
    setBusqueda({ nombre: busqueda.nombre });
  }

  async function eliminar(pedido: Pedido) {
    if (
      eliminando !== null ||
      !window.confirm(
        `¿Eliminar el pedido «${pedido.nombre}»? Esta acción es permanente.`,
      )
    )
      return;
    setEliminando(pedido.id);
    setErrorOperacion("");
    setMensaje("");
    try {
      const respuesta = await fetch(`/api/pedidos/${pedido.id}`, {
        method: "DELETE",
      });
      if (respuesta.status === 401) {
        setResultado({ estado: "sinSesion" });
        return;
      }
      if (respuesta.status === 204) {
        ultimoEditado.current = null;
        restaurarFoco.current = true;
        setMensaje("Pedido eliminado correctamente.");
        recargar();
      } else if (respuesta.status === 404) {
        ultimoEditado.current = null;
        restaurarFoco.current = true;
        setErrorOperacion("El pedido ya no está disponible.");
        recargar();
      } else {
        setErrorOperacion(
          "No se pudo eliminar el pedido. Vuelve a intentarlo.",
        );
      }
    } catch {
      setErrorOperacion(
        "No se pudo confirmar el borrado. Actualiza el listado antes de volver a intentarlo.",
      );
    } finally {
      setEliminando(null);
    }
  }

  useEffect(() => {
    const solicitud = new AbortController();
    const parametros = new URLSearchParams({ nombre: busqueda.nombre });

    async function cargar() {
      try {
        const respuesta = await fetch(`/api/pedidos?${parametros}`, {
          signal: solicitud.signal,
          cache: "no-store",
        });
        if (respuesta.status === 401) {
          if (!solicitud.signal.aborted) setResultado({ estado: "sinSesion" });
          return;
        }
        if (!respuesta.ok) throw new Error();
        const pedidos: Pedido[] = await respuesta.json();
        if (!solicitud.signal.aborted)
          setResultado({ estado: "listo", pedidos });
      } catch {
        if (!solicitud.signal.aborted) setResultado({ estado: "error" });
      }
    }

    void cargar();
    return () => solicitud.abort();
  }, [busqueda]);

  if (editando) {
    return (
      <OrderForm
        key={editando.id}
        inicial={{
          id: editando.id,
          nombre: editando.nombre,
          dominioDeseado: editando.dominioDeseado,
          descripcion: editando.descripcion,
          servicioIds: editando.servicios.map((servicio) => servicio.id),
        }}
        onCancelar={() => {
          restaurarFoco.current = true;
          setEditando(null);
        }}
        onGuardado={() => {
          restaurarFoco.current = true;
          setEditando(null);
          setMensaje("Pedido actualizado correctamente.");
          recargar();
        }}
      />
    );
  }

  return (
    <section>
      <h1 ref={titulo} tabIndex={-1}>
        Mis pedidos
      </h1>
      <p className="mt-3 text-slate-600 dark:text-slate-300">
        Consulta tus pedidos y los servicios incluidos en cada uno.
      </p>
      {mensaje && (
        <p role="status" className="mt-4">
          {mensaje}
        </p>
      )}
      {errorOperacion && (
        <p role="alert" className="mt-4">
          {errorOperacion}
        </p>
      )}
      {resultado.estado !== "sinSesion" && (
        <form
          className="mt-6 max-w-lg"
          onSubmit={(evento) => {
            evento.preventDefault();
            const datos = new FormData(evento.currentTarget);
            setResultado({ estado: "cargando" });
            setBusqueda({ nombre: String(datos.get("nombre") ?? "").trim() });
          }}
        >
          <label htmlFor="buscar-pedido" className="mb-2 block font-medium">
            Buscar por nombre del pedido
          </label>
          <div className="flex flex-wrap gap-2">
            <input
              id="buscar-pedido"
              name="nombre"
              defaultValue={busqueda.nombre}
              type="search"
              className="form-field flex-1"
            />
            <button
              type="submit"
              disabled={eliminando !== null}
              className="rounded-lg border px-4 py-2"
            >
              Buscar
            </button>
          </div>
        </form>
      )}
      {resultado.estado === "cargando" && (
        <p role="status" className="mt-6">
          Cargando pedidos…
        </p>
      )}
      {resultado.estado === "sinSesion" && (
        <p className="mt-6">
          <Link href="/login" className="underline">
            Inicia sesión
          </Link>{" "}
          para consultar tus pedidos.
        </p>
      )}
      {resultado.estado === "error" && (
        <p role="alert" className="mt-6">
          No se pudieron cargar los pedidos. Pulsa Buscar para volver a
          intentarlo.
        </p>
      )}
      {resultado.estado === "listo" && resultado.pedidos.length > 0 && (
        <p role="status" className="mt-6">
          Pedidos encontrados: {resultado.pedidos.length}.
        </p>
      )}
      {resultado.estado === "listo" &&
        (resultado.pedidos.length === 0 ? (
          <p role="status" className="mt-6">
            {busqueda.nombre
              ? "No hay pedidos que coincidan con la búsqueda."
              : "Todavía no tienes pedidos."}
          </p>
        ) : (
          <ul className="mt-6 space-y-4">
            {resultado.pedidos.map((pedido) => (
              <li
                key={pedido.id}
                className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800"
              >
                <h2 className="break-words text-lg font-semibold">
                  {pedido.nombre}
                </h2>
                <p className="mt-2 break-words">
                  Dominio deseado: {pedido.dominioDeseado}
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <button
                    id={`editar-pedido-${pedido.id}`}
                    type="button"
                    disabled={eliminando !== null}
                    className="rounded-lg border px-4 py-2"
                    aria-label={`Editar pedido ${pedido.nombre}`}
                    onClick={() => {
                      setMensaje("");
                      setErrorOperacion("");
                      ultimoEditado.current = pedido.id;
                      setEditando(pedido);
                    }}
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    disabled={eliminando !== null}
                    className="rounded-lg border px-4 py-2"
                    aria-label={`Eliminar pedido ${pedido.nombre}`}
                    onClick={() => eliminar(pedido)}
                  >
                    {eliminando === pedido.id ? "Eliminando…" : "Eliminar"}
                  </button>
                </div>
                <p className="mt-2 whitespace-pre-wrap break-words">
                  {pedido.descripcion}
                </p>
                <p className="mt-2">
                  Servicios:{" "}
                  {pedido.servicios
                    .map((servicio) => servicio.nombre)
                    .join(", ")}
                </p>
              </li>
            ))}
          </ul>
        ))}
      <Link
        href="/comprar"
        className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
      >
        Comprar página
      </Link>
    </section>
  );
}
