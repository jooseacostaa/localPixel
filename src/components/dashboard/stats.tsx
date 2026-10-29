export default function Stats() {
  return (
    <dl className="mt-8 grid gap-4 sm:grid-cols-2">
      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6">
        <dt className="text-sm text-slate-600 dark:text-slate-300">
          Páginas activas
        </dt>
        <dd className="mt-2 text-3xl font-bold">12</dd>
      </div>
      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6">
        <dt className="text-sm text-slate-600 dark:text-slate-300">
          Pedidos pendientes
        </dt>
        <dd className="mt-2 text-3xl font-bold">3</dd>
      </div>
    </dl>
  );
}
