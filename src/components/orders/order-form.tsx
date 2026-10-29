"use client";

import { useState } from "react";

export default function OrderForm() {
  const [step, setStep] = useState<"form" | "confirmation" | "completed">(
    "form",
  );

  return (
    <section className="max-w-2xl">
      <h1>Nuevo pedido</h1>
      <p className="mt-3 text-slate-600 dark:text-slate-300">
        Completa los datos de tu página web.
      </p>
      <form
        hidden={step !== "form"}
        className="mt-6 space-y-5 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800"
        onSubmit={(event) => {
          event.preventDefault();
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
            required
            maxLength={100}
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
            defaultValue=""
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
            maxLength={253}
            placeholder="ejemplo.com"
            aria-describedby="domain-help"
            className="form-field"
          />
          <p
            id="domain-help"
            className="mt-2 text-sm text-slate-600 dark:text-slate-300"
          >
            Por ejemplo: ejemplo.com.
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
            className="form-field"
          />
        </div>
        <p className="text-slate-600 dark:text-slate-300">
          Plazo estimado: 7 días · Total estimado: <strong>249 €</strong>
        </p>
        <button
          type="submit"
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
          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setStep("completed")}
              className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
            >
              Confirmar
            </button>
            <button
              type="button"
              onClick={() => setStep("form")}
              className="rounded-lg border border-slate-600 px-5 py-3"
            >
              Volver a editar
            </button>
          </div>
        </section>
      )}
      <p role="status" className="mt-4 text-blue-700 dark:text-blue-300">
        {step === "completed" ? "Datos del pedido confirmados." : ""}
      </p>
    </section>
  );
}
