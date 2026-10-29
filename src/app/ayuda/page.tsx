import Link from "next/link";

const questions = [
  {
    title: "¿Cómo funciona el acceso?",
    answer:
      "Introduce tu correo electrónico y una contraseña de al menos 8 caracteres. En el registro, ambas contraseñas deben coincidir.",
  },
  {
    title: "¿Cómo preparo un pedido?",
    answer:
      "En Comprar página, completa los campos obligatorios y pulsa Continuar. Puedes confirmar los datos o volver a editarlos.",
  },
  {
    title: "¿Cómo cambio al modo oscuro?",
    answer:
      "Abre Configuración y activa Modo oscuro. La preferencia se guarda en este navegador, si permite el almacenamiento.",
  },
  {
    title: "¿Qué hago si pierdo la conexión?",
    answer:
      "Comprueba tu conexión a Internet. Cuando el navegador detecte que estás sin conexión, aparecerá un aviso. Recupera la conexión y vuelve a abrir la página si no carga.",
  },
];

export default function Help() {
  return (
    <section className="max-w-2xl">
      <h1>Ayuda</h1>
      <p className="mt-3 text-slate-600 dark:text-slate-300">
        Respuestas para utilizar LocalPixel.
      </p>
      <div className="mt-6 space-y-4">
        {questions.map(({ title, answer }) => (
          <section
            key={title}
            className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800"
          >
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="mt-2 text-slate-600 dark:text-slate-300">{answer}</p>
          </section>
        ))}
      </div>
      <Link
        href="/"
        className="mt-6 inline-block text-blue-700 underline dark:text-blue-300"
      >
        Volver al inicio
      </Link>
    </section>
  );
}
