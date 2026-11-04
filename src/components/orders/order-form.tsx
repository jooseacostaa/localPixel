"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Servicio = { id: number; nombre: string };
type Pedido = {
  nombre: string;
  dominioDeseado: string;
  descripcion: string;
  servicioIds: number[];
};

type Props = {
  inicial?: Pedido & { id: number };
  onGuardado?: () => void;
  onCancelar?: () => void;
};

export default function OrderForm({ inicial, onGuardado, onCancelar }: Props) {
  const [step, setStep] = useState<"form" | "confirmation" | "completed">(
    "form",
  );
  const [servicios, setServicios] = useState<Servicio[] | null>(null);
  const [pedido, setPedido] = useState<Pedido | null>(null);
  const [error, setError] = useState("");
  const [sinSesion, setSinSesion] = useState(false);
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    const solicitud = new AbortController();
    async function cargar() {
      try {
        const respuesta = await fetch("/api/servicios", {
          signal: solicitud.signal,
        });
        if (respuesta.status === 401) {
          setSinSesion(true);
          return;
        }
        if (!respuesta.ok) throw new Error();
        setServicios(await respuesta.json());
      } catch {
        if (!solicitud.signal.aborted)
          setError("No se pudieron cargar los servicios.");
      }
    }
    void cargar();
    return () => solicitud.abort();
  }, []);

  async function confirmar() {
    if (!pedido || guardando) return;
    setGuardando(true);
    setError("");
    try {
      const respuesta = await fetch(
        inicial ? `/api/pedidos/${inicial.id}` : "/api/pedidos",
        {
          method: inicial ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(pedido),
        },
      );
      if (respuesta.status === (inicial ? 200 : 201)) {
        setStep("completed");
        onGuardado?.();
      } else if (respuesta.status === 401) {
        setSinSesion(true);
      } else {
        const detalle = await respuesta.json().catch(() => null);
        setError(detalle?.mensaje ?? "No se pudo guardar el pedido.");
      }
    } catch {
      setError(
        "No se pudo confirmar el guardado. Comprueba la conexión antes de volver a intentarlo.",
      );
    } finally {
      setGuardando(false);
    }
  }

  if (sinSesion) {
    return (
      <p>
        <Link href="/login" className="underline">
          Inicia sesión
        </Link>{" "}
        para gestionar tus pedidos.
      </p>
    );
  }

  return (
    <section className="max-w-2xl">
      <h1>{inicial ? "Editar pedido" : "Nuevo pedido"}</h1>
      <p className="mt-3 text-slate-600 dark:text-slate-300">
        Completa los datos del pedido y selecciona uno o varios servicios.
      </p>
      {error && (
        <p role="alert" className="mt-4">
          {error}
        </p>
      )}
      {servicios === null && !error && <p role="status">Cargando servicios…</p>}
      {servicios?.length === 0 && <p>No hay servicios disponibles.</p>}
      <form
        hidden={step !== "form"}
        className="mt-6 space-y-5 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800"
        onSubmit={(event) => {
          event.preventDefault();
          const form = new FormData(event.currentTarget);
          const servicioIds = form.getAll("servicio").map(Number);
          if (!servicioIds.length) {
            setError("Selecciona al menos un servicio.");
            return;
          }
          setError("");
          setPedido({
            nombre: String(form.get("name")),
            dominioDeseado: String(form.get("domain")),
            descripcion: String(form.get("description")),
            servicioIds,
          });
          setStep("confirmation");
        }}
      >
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Los campos marcados con * son obligatorios.
        </p>
        <div>
          <label htmlFor="name" className="mb-2 block font-medium">
            Nombre del pedido *
          </label>
          <input
            id="name"
            name="name"
            defaultValue={inicial?.nombre}
            required
            maxLength={100}
            className="form-field"
          />
        </div>
        <fieldset>
          <legend className="mb-2 font-medium">Servicios *</legend>
          {servicios?.map((servicio) => (
            <label
              key={servicio.id}
              className="flex min-h-11 items-center gap-3"
            >
              <input
                type="checkbox"
                name="servicio"
                value={servicio.id}
                defaultChecked={inicial?.servicioIds.includes(servicio.id)}
              />
              {servicio.nombre}
            </label>
          ))}
        </fieldset>
        <div>
          <label htmlFor="domain" className="mb-2 block font-medium">
            Dominio deseado *
          </label>
          <input
            id="domain"
            name="domain"
            defaultValue={inicial?.dominioDeseado}
            required
            maxLength={253}
            aria-describedby="domain-help"
            className="form-field"
          />
          <p
            id="domain-help"
            className="mt-2 text-sm text-slate-600 dark:text-slate-300"
          >
            Escribe el dominio que quieres para tu web.
          </p>
        </div>
        <div>
          <label htmlFor="description" className="mb-2 block font-medium">
            Descripción *
          </label>
          <textarea
            id="description"
            name="description"
            defaultValue={inicial?.descripcion}
            required
            maxLength={1000}
            rows={4}
            className="form-field"
          />
        </div>
        <button
          type="submit"
          disabled={!servicios?.length}
          className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
        >
          Continuar
        </button>
      </form>
      {step === "confirmation" && (
        <section
          className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 p-6 dark:border-blue-800 dark:bg-blue-950"
          aria-label="Confirmación del pedido"
        >
          <p role="status">¿Quieres confirmar los datos del pedido?</p>
          <p className="mt-2">
            {servicios
              ?.filter((s) => pedido?.servicioIds.includes(s.id))
              .map((s) => s.nombre)
              .join(", ")}
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={confirmar}
              disabled={guardando}
              className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
            >
              {guardando ? "Guardando…" : "Confirmar"}
            </button>
            <button
              type="button"
              onClick={() => setStep("form")}
              disabled={guardando}
              className="rounded-lg border border-slate-600 px-5 py-3"
            >
              Volver a editar
            </button>
          </div>
        </section>
      )}
      <p role="status" className="mt-4 text-blue-700 dark:text-blue-300">
        {step === "completed" ? "Pedido guardado correctamente." : ""}
      </p>
      {onCancelar && (
        <button
          type="button"
          disabled={guardando}
          onClick={onCancelar}
          className="mt-4 rounded-lg border px-5 py-3"
        >
          Cancelar edición
        </button>
      )}
    </section>
  );
}
