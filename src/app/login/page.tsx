import Link from "next/link";

export default function Login() {
  return <section><h1>Iniciar sesión</h1><p className="mt-3 text-slate-600">Accede a tu panel de páginas web.</p><Link href="/registro" className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700">Crear cuenta</Link></section>;
}
