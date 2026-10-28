import Link from "next/link";

export default function NotFound() {
  return <section><h1>Página no encontrada</h1><p className="mt-3 text-slate-600">La dirección que has abierto no existe.</p><Link href="/" className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700">Volver al inicio</Link></section>;
}
