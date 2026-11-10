import { useRef, useState } from "react";

const MAX_NOMBRE = 100;

type Props = {
  nombreAplicado: string;
  deshabilitado: boolean;
  onBuscar: (nombre: string) => void;
};

export default function OrderSearch({
  nombreAplicado,
  deshabilitado,
  onBuscar,
}: Props) {
  const [nombre, setNombre] = useState(nombreAplicado);
  const [error, setError] = useState(false);
  const campo = useRef<HTMLInputElement>(null);

  return (
    <form
      role="search"
      aria-label="Buscar pedidos"
      className="surface mt-6 max-w-xl p-5"
      onSubmit={(evento) => {
        evento.preventDefault();
        if (deshabilitado) return;
        const criterio = nombre.trim();
        if (Array.from(criterio).length > MAX_NOMBRE) {
          setError(true);
          campo.current?.focus();
          return;
        }
        setError(false);
        setNombre(criterio);
        onBuscar(criterio);
      }}
    >
      <label htmlFor="buscar-pedido" className="mb-2 block font-medium">
        Buscar por nombre del pedido
      </label>
      <input
        id="buscar-pedido"
        ref={campo}
        name="nombre"
        type="search"
        value={nombre}
        disabled={deshabilitado}
        aria-invalid={error || undefined}
        aria-describedby={error ? "buscar-ayuda buscar-error" : "buscar-ayuda"}
        className="form-field"
        onChange={(evento) => {
          setNombre(evento.target.value);
          setError(false);
        }}
      />
      <p
        id="buscar-ayuda"
        className="mt-2 text-sm text-slate-600 dark:text-slate-300"
      >
        Escribe todo o parte del nombre, hasta {MAX_NOMBRE} caracteres. Deja el
        campo vacío para ver todos tus pedidos.
      </p>
      {error && (
        <p
          id="buscar-error"
          role="alert"
          className="feedback feedback-error mt-3"
        >
          Acorta la búsqueda a {MAX_NOMBRE} caracteres como máximo.
        </p>
      )}
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={deshabilitado}
          className="button-primary"
        >
          Buscar
        </button>
        <button
          type="button"
          disabled={deshabilitado}
          className="button-secondary"
          onClick={() => {
            setNombre("");
            setError(false);
            onBuscar("");
            campo.current?.focus();
          }}
        >
          Limpiar búsqueda
        </button>
      </div>
    </form>
  );
}
