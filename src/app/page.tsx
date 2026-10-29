import Stats from "@/components/dashboard/stats";
import QuickLinks from "@/components/dashboard/quick-links";
import RecentActivity from "@/components/dashboard/recent-activity";

export default function Home() {
  return (
    <>
      <h1>Panel de control</h1>
      <p className="mt-3 text-slate-600 dark:text-slate-300">
        Bienvenido a LocalPixel. Gestiona tus páginas web y pedidos desde aquí.
      </p>
      <Stats />
      <QuickLinks />
      <RecentActivity />
    </>
  );
}
