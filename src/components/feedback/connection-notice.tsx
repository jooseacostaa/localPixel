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
        <p className="feedback feedback-warning mb-6">
          El navegador indica que no hay conexión. Algunas páginas pueden no
          cargar hasta que recuperes la conexión.
        </p>
      )}
    </div>
  );
}
