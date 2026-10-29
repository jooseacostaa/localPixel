import Link from "next/link";

const pages = [
  { name: "Página 1", type: "Sitio corporativo" },
  { name: "Página 2", type: "Tienda online" },
  { name: "Página 3", type: "Portfolio" },
];

export default function Pages() {
  return (
    <section>
      <h1>Mis páginas</h1>
      <p className="mt-3 text-slate-600 dark:text-slate-300">
        Consulta tus páginas web.
      </p>
      <ul className="mt-6 space-y-4">
        {pages.map((page) => (
          <li
            key={page.name}
            className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6"
          >
            <div>
              <h2 className="text-lg font-semibold">{page.name}</h2>
              <p className="mt-1 text-slate-600 dark:text-slate-300">
                {page.type}
              </p>
            </div>
            <span className="rounded-full bg-blue-50 dark:bg-blue-950 px-3 py-1 text-sm text-blue-900 dark:text-blue-100">
              Activa
            </span>
          </li>
        ))}
      </ul>
      <Link
        href="/comprar"
        className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
      >
        Comprar página
      </Link>
    </section>
  );
}
