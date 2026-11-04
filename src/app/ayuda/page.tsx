import Link from "next/link";

const questions = [
  {
    title: "¿Cómo creo una cuenta?",
    answer:
      "Abre Iniciar sesión y pulsa Crear cuenta. Introduce tu nombre, correo electrónico y una contraseña de al menos 8 caracteres. Repite la contraseña y pulsa Crear cuenta. Si el correo ya está registrado o algún campo es incorrecto, aparecerá un mensaje para que puedas corregirlo. Cuando se confirme el registro, pulsa Iniciar sesión.",
  },
  {
    title: "¿Cómo inicio y cierro sesión?",
    answer:
      "En Iniciar sesión, introduce el correo y la contraseña de tu cuenta y pulsa Iniciar sesión. Al acceder, se abrirá Mis pedidos y verás el aviso Sesión iniciada. Para salir, pulsa Cerrar sesión en ese aviso; volverás a Iniciar sesión. Si se te solicita iniciar sesión de nuevo, vuelve a introducir tus credenciales.",
  },
  {
    title: "¿Cómo creo un pedido?",
    answer:
      "Con la sesión iniciada, abre Comprar página. Escribe el nombre del pedido, el dominio deseado y la descripción. Marca al menos un servicio entre Sitio corporativo, Tienda online y Portfolio. Puedes seleccionar varios en el mismo pedido. Pulsa Continuar para revisar la selección y después Confirmar para guardar. También puedes pulsar Volver a editar. El mensaje Pedido guardado correctamente confirma que se ha guardado.",
  },
  {
    title: "¿Dónde consulto mis pedidos?",
    answer:
      "Abre Mis pedidos con la sesión iniciada. Cada pedido muestra su nombre, el dominio deseado, la descripción y los servicios incluidos. También encontrarás los botones Editar y Eliminar. Si todavía no tienes pedidos, aparecerá un mensaje indicándolo.",
  },
  {
    title: "¿Cómo busco un pedido?",
    answer:
      "En Mis pedidos, escribe todo o parte del nombre en Buscar por nombre del pedido y pulsa Buscar. La búsqueda admite mayúsculas y minúsculas. Para volver al listado completo, vacía el campo y pulsa Buscar otra vez. Si no hay coincidencias, aparecerá un mensaje.",
  },
  {
    title: "¿Cómo modifico un pedido?",
    answer:
      "En Mis pedidos, pulsa Editar en el pedido que quieras cambiar. El formulario mostrará sus datos y los servicios seleccionados. Modifica lo que necesites, manteniendo al menos un servicio, pulsa Continuar y después Confirmar. Volverás al listado con el mensaje Pedido actualizado correctamente. Para abandonar los cambios, pulsa Cancelar edición.",
  },
  {
    title: "¿Cómo elimino un pedido?",
    answer:
      "En Mis pedidos, pulsa Eliminar en el pedido correspondiente. Comprueba su nombre en la confirmación y acepta para borrarlo de forma permanente, o cancela para conservarlo. Cuando se complete, aparecerá el mensaje Pedido eliminado correctamente y se actualizará el listado.",
  },
  {
    title: "¿Cómo cambio al modo oscuro?",
    answer:
      "Abre Configuración y activa Modo oscuro. La preferencia se guarda en este navegador, si permite el almacenamiento.",
  },
  {
    title: "¿Qué hago si pierdo la conexión?",
    answer:
      "Comprueba tu conexión. Cuando el navegador detecte que estás sin conexión, aparecerá un aviso. Si falla la carga de Mis pedidos, pulsa Buscar para volver a intentarlo. Si aparece un error al guardar o eliminar, consulta el listado cuando recuperes la conexión para comprobar si la operación se completó antes de repetirla.",
  },
];

export default function Help() {
  return (
    <section className="max-w-2xl">
      <h1>Ayuda</h1>
      <p className="mt-3 text-slate-600 dark:text-slate-300">
        LocalPixel permite solicitar la creación de páginas web y gestionar tus
        pedidos. Aquí encontrarás las instrucciones para crear tu cuenta, elegir
        servicios y consultar, buscar, modificar o eliminar tus pedidos.
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
