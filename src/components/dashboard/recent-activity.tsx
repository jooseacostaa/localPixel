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

export default function RecentActivity() {
  return (
    <section aria-labelledby="actividad" className="mt-10">
      <h2 id="actividad" className="text-xl font-semibold">
        Actividad reciente
      </h2>
      <ul className="mt-4 space-y-3">
        {activity.map(({ title, description, date }) => (
          <li
            key={title}
            className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 sm:flex sm:items-center sm:justify-between sm:gap-4"
          >
            <div>
              <h3 className="font-semibold">{title}</h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                {description}
              </p>
            </div>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 sm:mt-0">
              {date}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
