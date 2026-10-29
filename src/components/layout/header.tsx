import Link from "next/link";
import Image from "next/image";
import Navigation from "./navigation";

export default function Header() {
  return (
    <header className="border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-2">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 text-xl font-bold text-slate-900 dark:text-slate-100"
        >
          <Image
            src="/favicon.ico"
            alt=""
            width={40}
            height={40}
            unoptimized
            className="rounded bg-white"
          />
          Local<span className="text-blue-600">Pixel</span>
        </Link>
        <Navigation />
      </div>
    </header>
  );
}
