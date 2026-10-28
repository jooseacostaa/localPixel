"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/paginas", label: "Mis páginas" },
  { href: "/comprar", label: "Comprar página" },
  { href: "/configuracion", label: "Configuración" },
  { href: "/ayuda", label: "Ayuda" },
  { href: "/login", label: "Iniciar sesión" },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav aria-label="Navegación principal" className="flex flex-wrap gap-1">
      {links.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          aria-current={pathname === href ? "page" : undefined}
          className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${pathname === href ? "bg-blue-600 text-white" : "text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-700 hover:text-blue-700 dark:hover:text-blue-200"}`}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
