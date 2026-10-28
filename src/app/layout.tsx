import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "./navigation";
import "./globals.css";

export const metadata: Metadata = {
  title: "LocalPixel | Gestiona tus páginas",
  description: "Tu espacio para gestionar páginas web y pedidos.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>
        <a href="#contenido" className="skip-link">Saltar al contenido</a>
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-5xl flex-col gap-4 px-5 py-5">
            <Link href="/" className="w-fit text-2xl font-bold text-slate-900">Local<span className="text-blue-600">Pixel</span></Link>
            <Navigation />
          </div>
        </header>
        <main id="contenido" tabIndex={-1} className="mx-auto max-w-5xl px-5 py-10">{children}</main>
      </body>
    </html>
  );
}
