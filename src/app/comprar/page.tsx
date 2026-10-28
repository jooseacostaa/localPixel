"use client";

import { useEffect, useRef, useState } from "react";

export default function Order() {
  const [reviewing, setReviewing] = useState(false);
  const reviewHeading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (reviewing) reviewHeading.current?.focus();
  }, [reviewing]);
  const [completed, setCompleted] = useState(false);
  const [details, setDetails] = useState({
    name: "",
    type: "",
    domain: "",
    description: "",
  });

  return (
    <section className="max-w-2xl">
      <h1>Nuevo pedido</h1>
      <p className="mt-3 text-slate-600 dark:text-slate-300">
        Completa los datos de tu página. Es una demostración: no se enviará un
        pedido ni se realizará un cobro.
      </p>
      <form
        className="mt-6 space-y-5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6"
        onSubmit={(event) => {
          event.preventDefault();
          setCompleted(false);
          setReviewing(true);
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
            required
            maxLength={100}
            value={details.name}
            onChange={(event) => {
              setDetails({ ...details, name: event.target.value });
              setReviewing(false);
              setCompleted(false);
            }}
            className="form-field"
          />
        </div>
        <div>
          <label htmlFor="type" className="mb-2 block font-medium">
            Tipo de página *
          </label>
          <select
            id="type"
            name="type"
            required
            value={details.type}
            onChange={(event) => {
              setDetails({ ...details, type: event.target.value });
              setReviewing(false);
              setCompleted(false);
            }}
            className="form-field"
          >
            <option value="">Selecciona un tipo</option>
            <option>Sitio corporativo</option>
            <option>Tienda online</option>
            <option>Portfolio</option>
          </select>
        </div>
        <div>
          <label htmlFor="domain" className="mb-2 block font-medium">
            Dominio deseado *
          </label>
          <input
            id="domain"
            name="domain"
            required
            pattern="[a-zA-Z0-9]([a-zA-Z0-9\-]*[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9\-]*[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}"
            title="Introduce un dominio como ejemplo.com, sin https:// ni espacios."
            aria-describedby="domain-help"
            placeholder="ejemplo.com"
            value={details.domain}
            onChange={(event) => {
              setDetails({ ...details, domain: event.target.value });
              setReviewing(false);
              setCompleted(false);
            }}
            className="form-field"
          />
          <p
            id="domain-help"
            className="mt-2 text-sm text-slate-600 dark:text-slate-300"
          >
            Por ejemplo: ejemplo.com, sin https://. No se comprobará su
            disponibilidad.
          </p>
        </div>
        <div>
          <label htmlFor="description" className="mb-2 block font-medium">
            Descripción *
          </label>
          <textarea
            id="description"
            name="description"
            required
            maxLength={1000}
            rows={4}
            value={details.description}
            onChange={(event) => {
              setDetails({ ...details, description: event.target.value });
              setReviewing(false);
              setCompleted(false);
            }}
            className="form-field"
          />
        </div>
        <p className="text-slate-600 dark:text-slate-300">
          Plazo estimado: 7 días · Total de ejemplo: <strong>249 €</strong>
        </p>
        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
        >
          Revisar pedido
        </button>
      </form>
      {reviewing && (
        <section
          aria-labelledby="review"
          className="mt-6 rounded-2xl border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950 p-6"
        >
          <h2
            id="review"
            ref={reviewHeading}
            tabIndex={-1}
            className="text-xl font-semibold"
          >
            ¿Confirmar esta simulación?
          </h2>
          <dl className="mt-3 space-y-2">
            <div>
              <dt className="font-semibold">Nombre</dt>
              <dd className="break-words">{details.name}</dd>
            </div>
            <div>
              <dt className="font-semibold">Tipo</dt>
              <dd>{details.type}</dd>
            </div>
            <div>
              <dt className="font-semibold">Dominio</dt>
              <dd className="break-words">{details.domain}</dd>
            </div>
            <div>
              <dt className="font-semibold">Descripción</dt>
              <dd className="whitespace-pre-wrap break-words">
                {details.description}
              </dd>
            </div>
            <div>
              <dt className="font-semibold">Total de ejemplo</dt>
              <dd>249 €</dd>
            </div>
          </dl>
          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => {
                setReviewing(false);
                setCompleted(true);
              }}
              className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
            >
              Confirmar simulación
            </button>
            <button
              type="button"
              onClick={() => setReviewing(false)}
              className="rounded-lg border border-slate-600 px-5 py-3"
            >
              Volver a editar
            </button>
          </div>
        </section>
      )}
      <p role="status" className="mt-4 text-blue-700 dark:text-blue-300">
        {completed
          ? "Simulación completada. No se ha enviado ni guardado ningún pedido y no se ha realizado ningún cobro."
          : ""}
      </p>
    </section>
  );
}
