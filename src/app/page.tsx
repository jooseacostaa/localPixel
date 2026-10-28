import Link from "next/link";

const sections = [
  {
    href: "/paginas",
    title: "Mis páginas",
    description: "Consulta tus páginas web.",
  },
  {
    href: "/comprar",
    title: "Comprar página",
    description: "Prepara un nuevo pedido.",
  },
  {
    href: "/configuracion",
    title: "Configuración",
    description: "Ajusta las preferencias de la aplicación.",
  },
];

export default function Home() {
  return (
    <>
      <h1>Panel de control</h1>
      <p className="mt-3 text-slate-600">
        Bienvenido a LocalPixel. Elige una sección para continuar.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map(({ href, title, description }) => (
          <Link
            key={href}
            href={href}
            className="rounded-2xl border border-slate-200 bg-white p-6 hover:border-blue-600"
          >
            <h2 className="text-xl font-semibold text-blue-700">{title}</h2>
            <p className="mt-2 text-slate-600">{description}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
