import type { Metadata } from "next";
import ThemeInitializer from "@/components/theme/theme-initializer";
import { SessionNotice } from "@/components/feedback/session-notice";
import ConnectionNotice from "@/components/feedback/connection-notice";
import Header from "@/components/layout/header";
import ServiceWorker from "@/components/pwa/service-worker";
import "./globals.css";

export const metadata: Metadata = {
  title: "LocalPixel | Gestiona tus páginas",
  description: "Tu espacio para gestionar páginas web y pedidos.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>
        <ThemeInitializer />
        <ServiceWorker />
        <a href="#contenido" className="skip-link">
          Saltar al contenido
        </a>
        <Header />
        <main
          id="contenido"
          tabIndex={-1}
          className="mx-auto max-w-5xl px-5 py-10"
        >
          <ConnectionNotice />
          <SessionNotice />
          {children}
        </main>
      </body>
    </html>
  );
}
