const PREFIJO_CACHE = "localpixel-";
const CACHE = `${PREFIJO_CACHE}v1`;
const SIN_CONEXION = "/sin-conexion.html";
const MAX_RECURSOS = 64;

self.addEventListener("install", (evento) => {
  evento.waitUntil(caches.open(CACHE).then((cache) => cache.add(SIN_CONEXION)));
});

self.addEventListener("activate", (evento) => {
  evento.waitUntil(
    caches.keys().then(async (nombres) => {
      await Promise.all(
        nombres
          .filter(
            (nombre) => nombre.startsWith(PREFIJO_CACHE) && nombre !== CACHE,
          )
          .map((nombre) => caches.delete(nombre)),
      );
      await self.clients.claim();
    }),
  );
});

async function cargarRecurso(peticion) {
  const cache = await caches.open(CACHE).catch(() => null);
  const guardado = await cache?.match(peticion);
  if (guardado) return guardado;

  const respuesta = await fetch(peticion);
  if (
    cache &&
    respuesta.ok &&
    !respuesta.redirected &&
    respuesta.headers.get("cache-control")?.includes("immutable")
  ) {
    try {
      await cache.put(peticion, respuesta.clone());
      const recursos = (await cache.keys()).filter(
        (recurso) => new URL(recurso.url).pathname !== SIN_CONEXION,
      );
      const sobrantes = recursos.slice(
        0,
        Math.max(0, recursos.length - MAX_RECURSOS),
      );
      await Promise.all(sobrantes.map((recurso) => cache.delete(recurso)));
    } catch {
      // La respuesta de red se puede usar aunque falle el almacenamiento.
    }
  }
  return respuesta;
}

self.addEventListener("fetch", (evento) => {
  const peticion = evento.request;
  const url = new URL(peticion.url);
  if (
    peticion.method !== "GET" ||
    url.origin !== self.location.origin ||
    url.pathname === "/api" ||
    url.pathname.startsWith("/api/")
  )
    return;

  if (peticion.mode === "navigate") {
    evento.respondWith(
      fetch(peticion).catch(async () => {
        const cache = await caches.open(CACHE);
        return (await cache.match(SIN_CONEXION)) ?? Response.error();
      }),
    );
  } else if (url.pathname.startsWith("/_next/static/")) {
    evento.respondWith(cargarRecurso(peticion));
  }
});
