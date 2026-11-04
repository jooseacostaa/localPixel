import Link from "next/link";
import Image from "next/image";
import Navigation from "./navigation";

export default function Header() {
  return (
    <header className="site-header">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-5 py-4">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 text-xl font-bold text-slate-900 dark:text-slate-100"
        >
          <Image
            src="/icon.png"
            alt=""
            width={40}
            height={40}
            unoptimized
            className="rounded bg-white"
          />
          <span className="tracking-tight">
            Local<span className="text-blue-600 dark:text-blue-300">Pixel</span>
          </span>
        </Link>
        <Navigation />
      </div>
    </header>
  );
}
