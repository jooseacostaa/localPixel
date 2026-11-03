import Link from "next/link";

export default function Pages() {
  return (
    <section>
      <h1>Mis páginas</h1>
      <p className="mt-3 text-slate-600 dark:text-slate-300">
        Aquí podrás consultar tus páginas web cuando el listado esté disponible.
      </p>
      <Link
        href="/comprar"
        className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
      >
        Comprar página
      </Link>
    </section>
  );
}
