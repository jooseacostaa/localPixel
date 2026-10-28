import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LocalPixel | Gestiona tus páginas",
  description: "Tu espacio para gestionar páginas web y pedidos.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body>{children}</body></html>;
}
