"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function AuthForm({ register = false }: { register?: boolean }) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [campoError, setCampoError] = useState<string | null>(null);
  const avisoError = useRef<HTMLParagraphElement>(null);
  const avisoRegistro = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (error) avisoError.current?.focus();
    else if (completed) avisoRegistro.current?.focus();
  }, [error, completed]);

  return (
    <section className="mx-auto max-w-md">
      <h1>{register ? "Crear cuenta" : "Iniciar sesión"}</h1>
      {completed ? (
        <div className="mt-6 surface p-6">
          <p
            className="feedback feedback-success"
            ref={avisoRegistro}
            tabIndex={-1}
            role="status"
          >
            Cuenta creada. Ya puedes iniciar sesión.
          </p>
          <Link href="/login" className="mt-5 inline-block button-primary">
            Iniciar sesión
          </Link>
        </div>
      ) : (
        <form
          aria-busy={pending}
          onInvalid={(event) => {
            event.preventDefault();
            const input = event.target as HTMLInputElement;
            if (input !== event.currentTarget.querySelector(":invalid")) return;
            const campos: Record<string, string> = {
              name: "nombre",
              email: "correo",
              password: "password",
              confirmation: "confirmacion",
            };
            setCampoError(campos[input.name]);
            setError(
              input.validity.valueMissing
                ? `Completa el campo ${input.labels?.[0]?.textContent?.trim().toLowerCase()}.`
                : input.type === "email"
                  ? "Escribe un correo válido, con el formato nombre@dominio.com."
                  : input.validity.tooShort
                    ? "La contraseña debe tener al menos 8 caracteres."
                    : input.name === "confirmation"
                      ? "Las contraseñas no coinciden. Vuelve a escribir la misma contraseña."
                      : "Escribe un nombre que no contenga solo espacios.",
            );
          }}
          className="mt-6 space-y-5 surface p-6"
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
          onSubmit={async (event) => {
            event.preventDefault();
            if (pending) return;
            const form = new FormData(event.currentTarget);
            const datos = {
              correo: form.get("email"),
              password: form.get("password"),
            };
            setError("");
            setCampoError(null);
            setPending(true);
            try {
              const respuesta = await fetch(
                register ? "/api/sesion/registro" : "/api/sesion",
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(
                    register
                      ? {
                          ...datos,
                          nombre: form.get("name"),
                          confirmacion: form.get("confirmation"),
                        }
                      : datos,
                  ),
                },
              );
              if (respuesta.status !== (register ? 201 : 204)) {
                const detalle = await respuesta.json().catch(() => null);
                setCampoError(
                  !register && respuesta.status === 401
                    ? "credenciales"
                    : (detalle?.campo ?? null),
                );
                setError(
                  !register && respuesta.status === 401
                    ? "El correo o la contraseña no son correctos. Revísalos e inténtalo de nuevo."
                    : register && respuesta.status === 409
                      ? "Ya existe una cuenta con este correo. Inicia sesión o utiliza otro correo."
                      : respuesta.status >= 500
                        ? "El servicio no está disponible en este momento. Inténtalo de nuevo más tarde."
                        : (detalle?.mensaje ??
                          "No se pudo completar la solicitud. Revisa los datos e inténtalo de nuevo."),
                );
                return;
              }
              if (register) setCompleted(true);
              else {
                router.replace("/paginas");
                router.refresh();
              }
            } catch {
              setError(
                "No se pudo conectar con LocalPixel. Comprueba tu conexión e inténtalo de nuevo.",
              );
            } finally {
              setPending(false);
            }
          }}
        >
          {error && (
            <p
              className="feedback feedback-error"
              id="acceso-error"
              ref={avisoError}
              tabIndex={-1}
              role="alert"
            >
              {error}
            </p>
          )}
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
                aria-invalid={campoError === "nombre" || undefined}
                aria-describedby={
                  campoError === "nombre" ? "acceso-error" : undefined
                }
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
              aria-invalid={
                campoError === "correo" ||
                campoError === "credenciales" ||
                undefined
              }
              aria-describedby={
                campoError === "correo" || campoError === "credenciales"
                  ? "acceso-error"
                  : undefined
              }
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
              aria-invalid={
                campoError === "password" ||
                campoError === "credenciales" ||
                undefined
              }
              aria-describedby={
                campoError === "password" || campoError === "credenciales"
                  ? "password-help acceso-error"
                  : "password-help"
              }
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
                aria-invalid={campoError === "confirmacion" || undefined}
                aria-describedby={
                  campoError === "confirmacion" ? "acceso-error" : undefined
                }
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
            disabled={pending}
            className="w-full button-primary"
          >
            {pending
              ? "Enviando…"
              : register
                ? "Crear cuenta"
                : "Iniciar sesión"}
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
