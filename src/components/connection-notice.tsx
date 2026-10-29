"use client";

import { useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  window.addEventListener("online", callback);
  window.addEventListener("offline", callback);
  return () => {
    window.removeEventListener("online", callback);
    window.removeEventListener("offline", callback);
  };
}

export default function ConnectionNotice() {
  const online = useSyncExternalStore(
    subscribe,
    () => navigator.onLine,
    () => true,
  );
  return (
    <div role="status">
      {!online && (
        <p className="mb-6 rounded-lg border border-amber-600 bg-amber-50 p-4 text-amber-950 dark:bg-amber-950 dark:text-amber-100">
          El navegador indica que no hay conexión. Algunas páginas pueden no
          cargar hasta que recuperes la conexión.
        </p>
      )}
    </div>
  );
}
