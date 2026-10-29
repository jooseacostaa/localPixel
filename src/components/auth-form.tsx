"use client";

import Link from "next/link";
import { useState } from "react";

export default function AuthForm({ register = false }: { register?: boolean }) {
  const [showPassword, setShowPassword] = useState(false);
  const [completed, setCompleted] = useState(false);

  return (
    <section className="mx-auto max-w-md">
      <h1>{register ? "Crear cuenta" : "Iniciar sesión"}</h1>
      {completed ? (
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
          <p role="status">
            {register
              ? "Datos de registro correctos."
              : "Datos correctos. Puedes continuar."}
          </p>
          <Link
            href="/"
            className="mt-5 inline-block rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
          >
            Ir al panel de control
          </Link>
        </div>
      ) : (
        <form
          className="mt-6 space-y-5 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800"
          onInput={(event) => {
            if (!register) return;
            const form = event.currentTarget;
            const password = form.elements.namedItem(
              "password",
            ) as HTMLInputElement;
            const confirmation = form.elements.namedItem(
              "confirmation",
            ) as HTMLInputElement;
            confirmation.setCustomValidity(
              confirmation.value && confirmation.value !== password.value
                ? "Las contraseñas deben coincidir."
                : "",
            );
          }}
          onSubmit={(event) => {
            event.preventDefault();

            event.currentTarget.reset();
            setCompleted(true);
          }}
        >
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Todos los campos son obligatorios.
          </p>
          {register && (
            <div>
              <label htmlFor="name" className="mb-2 block font-medium">
                Nombre
              </label>
              <input
                id="name"
                name="name"
                autoComplete="name"
                required
                maxLength={80}
                pattern=".*\S.*"
                title="Escribe un nombre que no contenga solo espacios."
                className="form-field"
              />
            </div>
          )}
          <div>
            <label htmlFor="email" className="mb-2 block font-medium">
              Correo electrónico
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={254}
              placeholder="nombre@ejemplo.com"
              className="form-field"
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-2 block font-medium">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete={register ? "new-password" : "current-password"}
              required
              minLength={8}
              aria-describedby="password-help"
              className="form-field"
            />
            <p
              id="password-help"
              className="mt-2 text-sm text-slate-600 dark:text-slate-300"
            >
              Usa al menos 8 caracteres.
            </p>
          </div>
          {register && (
            <div>
              <label htmlFor="confirmation" className="mb-2 block font-medium">
                Repite la contraseña
              </label>
              <input
                id="confirmation"
                name="confirmation"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                minLength={8}
                className="form-field"
              />
            </div>
          )}
          <label className="flex min-h-11 cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={(event) => setShowPassword(event.target.checked)}
              className="h-5 w-5 accent-blue-600"
            />
            Mostrar contraseña
          </label>
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
          >
            {register ? "Crear cuenta" : "Iniciar sesión"}
          </button>
        </form>
      )}
      <div className="mt-6 flex flex-wrap gap-5 text-blue-700 dark:text-blue-300">
        <Link
          href={register ? "/login" : "/registro"}
          className="inline-flex min-h-11 items-center underline"
        >
          {register ? "Ya tengo cuenta" : "Crear cuenta"}
        </Link>
        <Link
          href="/ayuda"
          className="inline-flex min-h-11 items-center underline"
        >
          ¿Necesitas ayuda?
        </Link>
      </div>
    </section>
  );
}
