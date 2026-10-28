export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <section className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-12" aria-labelledby="title">
        <p className="mb-6 text-sm font-semibold tracking-widest text-blue-600">LOCALPIXEL</p>
        <h1 id="title" className="text-4xl font-bold tracking-tight text-slate-900">Tu próximo proyecto empieza aquí.</h1>
        <p className="mt-5 leading-7 text-slate-600">La base de LocalPixel está lista. En la siguiente etapa añadiremos la navegación y los componentes de tu panel.</p>
        <p className="mt-8 rounded-xl bg-blue-50 p-4 text-sm text-blue-800">Etapa 1 · Next.js, React, Tailwind y TypeScript</p>
      </section>
    </main>
  );
}
