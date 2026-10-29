import Link from "next/link";

export function SessionNotice() {
  return (
    <p className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-100">
      No has iniciado sesión.{" "}
      <Link href="/login" className="underline">
        Iniciar sesión
      </Link>
    </p>
  );
}
