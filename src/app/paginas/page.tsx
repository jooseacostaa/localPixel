"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import OrderForm from "@/components/orders/order-form";
import OrderList, { type Pedido } from "@/components/orders/order-list";
import OrderSearch from "@/components/orders/order-search";

type Resultado =
  | { estado: "cargando" | "sinSesion" | "error" }
  | { estado: "listo"; pedidos: Pedido[] };

function mensajeListado(resultado: Resultado, nombre: string) {
  if (resultado.estado === "cargando") {
    return nombre ? `Buscando pedidos para «${nombre}»…` : "Cargando pedidos…";
  }
  if (resultado.estado !== "listo") return "";
  const total = resultado.pedidos.length;
  if (total === 0) {
    return nombre
      ? `No hay pedidos que coincidan con «${nombre}». Prueba con otro nombre o limpia la búsqueda.`
      : "Todavía no tienes pedidos.";
  }
  const cantidad =
    total === 1 ? "1 pedido encontrado" : `${total} pedidos encontrados`;
  return nombre ? `${cantidad} para «${nombre}».` : `${cantidad}.`;
}

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

  function recargar(nombre = busqueda.nombre) {
    setResultado({ estado: "cargando" });
    setBusqueda({ nombre });
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
        <p role="status" className="feedback feedback-success mt-4">
          {mensaje}
        </p>
      )}
      {errorOperacion && (
        <p role="alert" className="feedback feedback-error mt-4">
          {errorOperacion}
        </p>
      )}
      {resultado.estado !== "sinSesion" && (
        <OrderSearch
          nombreAplicado={busqueda.nombre}
          deshabilitado={eliminando !== null}
          onBuscar={recargar}
        />
      )}
      <p role="status" className="mt-6 break-words empty:mt-0">
        {mensajeListado(resultado, busqueda.nombre)}
      </p>
      {resultado.estado === "sinSesion" && (
        <p className="feedback feedback-warning mt-6">
          <Link href="/login" className="underline">
            Inicia sesión
          </Link>{" "}
          para consultar tus pedidos.
        </p>
      )}
      {resultado.estado === "error" && (
        <div className="mt-6">
          <p role="alert" className="feedback feedback-error">
            {busqueda.nombre
              ? "No se pudo completar la búsqueda."
              : "No se pudieron cargar los pedidos."}{" "}
            Comprueba la conexión y vuelve a intentarlo.
          </p>
          <button
            type="button"
            className="button-secondary mt-3"
            onClick={() => recargar()}
          >
            Reintentar
          </button>
        </div>
      )}
      {resultado.estado === "listo" && resultado.pedidos.length > 0 && (
        <OrderList
          pedidos={resultado.pedidos}
          eliminando={eliminando}
          onEditar={(pedido) => {
            setMensaje("");
            setErrorOperacion("");
            ultimoEditado.current = pedido.id;
            setEditando(pedido);
          }}
          onEliminar={eliminar}
        />
      )}
      <Link href="/comprar" className="mt-6 inline-block button-primary">
        Comprar página
      </Link>
    </section>
  );
}
