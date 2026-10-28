import Link from "next/link";

export default function Registro() {
  return (
    <section>
      <h1>Crear cuenta</h1>
      <p className="mt-3 text-slate-600 dark:text-slate-300">
        Registro en LocalPixel.
      </p>
      <Link
        href="/login"
        className="mt-6 inline-block text-blue-700 dark:text-blue-300 underline"
      >
        Volver a iniciar sesión
      </Link>
    </section>
  );
}
