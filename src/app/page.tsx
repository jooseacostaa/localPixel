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

const activity = [
  {
    title: "Pedido #892 completado",
    description: "Tu página web está lista.",
    date: "Hace 2 horas",
  },
  {
    title: "Actualización de página",
    description: "Se ha actualizado el contenido de tu página.",
    date: "Hace 5 horas",
  },
];

export default function Home() {
  return (
    <>
      <h1>Panel de control</h1>
      <p className="mt-3 text-slate-600">
        Bienvenido a LocalPixel. Gestiona tus páginas web y pedidos desde aquí.
      </p>
      <p className="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900">
        Vista de demostración: las cifras y la actividad son datos de ejemplo.
      </p>

      <dl className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <dt className="text-sm text-slate-600">Páginas activas</dt>
          <dd className="mt-2 text-3xl font-bold">12</dd>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <dt className="text-sm text-slate-600">Pedidos pendientes</dt>
          <dd className="mt-2 text-3xl font-bold">3</dd>
        </div>
      </dl>

      <section aria-labelledby="accesos" className="mt-10">
        <h2 id="accesos" className="text-xl font-semibold">
          Accesos rápidos
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map(({ href, title, description }) => (
            <Link
              key={href}
              href={href}
              className="rounded-2xl border border-slate-200 bg-white p-6 hover:border-blue-600"
            >
              <h3 className="text-lg font-semibold text-blue-700">{title}</h3>
              <p className="mt-2 text-slate-600">{description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section aria-labelledby="actividad" className="mt-10">
        <h2 id="actividad" className="text-xl font-semibold">
          Actividad reciente
        </h2>
        <ul className="mt-4 space-y-3">
          {activity.map(({ title, description, date }) => (
            <li
              key={title}
              className="rounded-2xl border border-slate-200 bg-white p-5 sm:flex sm:items-center sm:justify-between sm:gap-4"
            >
              <div>
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-1 text-sm text-slate-600">{description}</p>
              </div>
              <p className="mt-2 text-sm text-slate-600 sm:mt-0">{date}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
