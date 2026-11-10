export type Pedido = {
  id: number;
  nombre: string;
  dominioDeseado: string;
  descripcion: string;
  servicios: { id: number; nombre: string }[];
};

type Props = {
  pedidos: Pedido[];
  eliminando: number | null;
  onEditar: (pedido: Pedido) => void;
  onEliminar: (pedido: Pedido) => void;
};

export default function OrderList({
  pedidos,
  eliminando,
  onEditar,
  onEliminar,
}: Props) {
  return (
    <ul aria-label="Resultados de pedidos" className="mt-6 space-y-4">
      {pedidos.map((pedido) => (
        <li key={pedido.id} className="surface p-6">
          <h2 className="break-words text-lg font-semibold">{pedido.nombre}</h2>
          <p className="mt-2 break-words">
            Dominio deseado: {pedido.dominioDeseado}
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              id={`editar-pedido-${pedido.id}`}
              type="button"
              disabled={eliminando !== null}
              className="button-secondary"
              aria-label={`Editar pedido ${pedido.nombre}`}
              onClick={() => onEditar(pedido)}
            >
              Editar
            </button>
            <button
              type="button"
              disabled={eliminando !== null}
              className="button-secondary button-danger"
              aria-label={`Eliminar pedido ${pedido.nombre}`}
              onClick={() => onEliminar(pedido)}
            >
              {eliminando === pedido.id ? "Eliminando…" : "Eliminar"}
            </button>
          </div>
          <p className="mt-2 whitespace-pre-wrap break-words">
            {pedido.descripcion}
          </p>
          <p className="mt-2">
            Servicios:{" "}
            {pedido.servicios.map((servicio) => servicio.nombre).join(", ")}
          </p>
        </li>
      ))}
    </ul>
  );
}
