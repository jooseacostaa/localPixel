"use client";

import { useEffect, useRef, useState } from "react";
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
  const [intentoCarga, setIntentoCarga] = useState(0);
  const [campoError, setCampoError] = useState<string | null>(null);
  const titulo = useRef<HTMLHeadingElement>(null);
  const tituloConfirmacion = useRef<HTMLHeadingElement>(null);
  const resultadoGuardado = useRef<HTMLParagraphElement>(null);
  const avisoError = useRef<HTMLParagraphElement>(null);
  const primerRender = useRef(true);
  const esEdicion = inicial !== undefined;

  useEffect(() => {
    if (primerRender.current) {
      primerRender.current = false;
      if (!esEdicion) return;
    }
    if (step === "form") titulo.current?.focus();
    if (step === "confirmation") tituloConfirmacion.current?.focus();
    if (step === "completed") resultadoGuardado.current?.focus();
  }, [step, esEdicion]);

  useEffect(() => {
    if (error) avisoError.current?.focus();
  }, [error]);

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
  }, [intentoCarga]);

  async function confirmar() {
    if (!pedido || guardando) return;
    setGuardando(true);
    setError("");
    setCampoError(null);
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
        setCampoError(detalle?.campo ?? null);
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
      <p className="feedback feedback-warning">
        <Link href="/login" className="underline">
          Inicia sesión
        </Link>{" "}
        para gestionar tus pedidos.
      </p>
    );
  }

  return (
    <section className="max-w-2xl" aria-busy={guardando}>
      <h1 ref={titulo} tabIndex={-1}>
        {inicial ? "Editar pedido" : "Nuevo pedido"}
      </h1>
      <p className="mt-3 text-slate-600 dark:text-slate-300">
        Completa los datos del pedido y selecciona uno o varios servicios.
      </p>
      {error && (
        <p
          id="pedido-error"
          ref={avisoError}
          tabIndex={-1}
          role="alert"
          className="feedback feedback-error mt-4"
        >
          {error}
        </p>
      )}
      {servicios === null && !error && <p role="status">Cargando servicios…</p>}
      {servicios === null && error && (
        <button
          type="button"
          className="mt-4 button-secondary"
          onClick={() => {
            setError("");
            setIntentoCarga((intento) => intento + 1);
          }}
        >
          Volver a cargar servicios
        </button>
      )}
      {servicios?.length === 0 && (
        <p className="feedback feedback-warning mt-4">
          No hay servicios disponibles. Vuelve a intentarlo más tarde.
        </p>
      )}
      <form
        hidden={step !== "form"}
        className="mt-6 space-y-5 surface p-6"
        onSubmit={(event) => {
          event.preventDefault();
          const form = new FormData(event.currentTarget);
          const servicioIds = form.getAll("servicio").map(Number);
          const nombre = String(form.get("name")).trim();
          const dominioDeseado = String(form.get("domain")).trim();
          const descripcion = String(form.get("description")).trim();
          setCampoError(null);
          if (!nombre || !dominioDeseado || !descripcion) {
            setCampoError(
              !nombre
                ? "nombre"
                : !dominioDeseado
                  ? "dominioDeseado"
                  : "descripcion",
            );
            setError("Completa los campos obligatorios con texto.");
            return;
          }
          if (!servicioIds.length) {
            setCampoError("servicioIds");
            setError("Selecciona al menos un servicio.");
            return;
          }
          setError("");
          setPedido({
            nombre,
            dominioDeseado,
            descripcion,
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
            aria-invalid={campoError === "nombre" || undefined}
            aria-describedby={
              campoError === "nombre" ? "pedido-error" : undefined
            }
            className="form-field"
          />
        </div>
        <fieldset
          aria-invalid={campoError === "servicioIds" || undefined}
          aria-describedby={
            campoError === "servicioIds" ? "pedido-error" : undefined
          }
        >
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
            aria-invalid={campoError === "dominioDeseado" || undefined}
            aria-describedby={
              campoError === "dominioDeseado"
                ? "domain-help pedido-error"
                : "domain-help"
            }
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
            aria-invalid={campoError === "descripcion" || undefined}
            aria-describedby={
              campoError === "descripcion" ? "pedido-error" : undefined
            }
            className="form-field"
          />
        </div>
        <button
          type="submit"
          disabled={!servicios?.length}
          className="button-primary"
        >
          Continuar
        </button>
      </form>
      {step === "confirmation" && (
        <section
          className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 p-6 dark:border-blue-800 dark:bg-blue-950"
          aria-label="Confirmación del pedido"
        >
          <h2 ref={tituloConfirmacion} tabIndex={-1} className="font-semibold">
            ¿Quieres confirmar los datos del pedido?
          </h2>
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
              className="button-primary"
            >
              {guardando ? "Guardando…" : "Confirmar"}
            </button>
            <button
              type="button"
              onClick={() => setStep("form")}
              disabled={guardando}
              className="button-secondary"
            >
              Volver a editar
            </button>
          </div>
        </section>
      )}
      <p
        ref={resultadoGuardado}
        tabIndex={-1}
        role="status"
        className="feedback feedback-success mt-4"
      >
        {step === "completed" ? "Pedido guardado correctamente." : ""}
      </p>
      {onCancelar && (
        <button
          type="button"
          disabled={guardando}
          onClick={onCancelar}
          className="mt-4 button-secondary"
        >
          Cancelar edición
        </button>
      )}
    </section>
  );
}
