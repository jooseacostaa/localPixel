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

export default function QuickLinks() {
  return (
    <section aria-labelledby="accesos" className="mt-10">
      <h2 id="accesos" className="text-xl font-semibold">
        Accesos rápidos
      </h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map(({ href, title, description }) => (
          <Link
            key={href}
            href={href}
            className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 hover:border-blue-600"
          >
            <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-300">
              {title}
            </h3>
            <p className="mt-2 text-slate-600 dark:text-slate-300">
              {description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
