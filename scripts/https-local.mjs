import { readFileSync } from "node:fs";
import http from "node:http";
import https from "node:https";

const [certificado, clave, puertoNext = "3103"] = process.argv.slice(2);
if (!certificado || !clave || !/^\d+$/.test(puertoNext)) {
  console.error(
    "Uso: npm run start:https -- certificado.pem clave.pem [puerto de Next.js]",
  );
  process.exit(1);
}

const direccion = "127.0.0.1";
const origen = new URL("https://localhost:3443");

const servidorSeguro = https.createServer(
  { cert: readFileSync(certificado), key: readFileSync(clave) },
  (peticion, respuesta) => {
    const haciaNext = http.request(
      {
        hostname: direccion,
        port: puertoNext,
        method: peticion.method,
        path: peticion.url,
        headers: {
          ...peticion.headers,
          host: origen.host,
          "x-forwarded-host": origen.host,
          "x-forwarded-proto": "https",
          "x-forwarded-port": origen.port,
        },
      },
      (desdeNext) => {
        respuesta.writeHead(desdeNext.statusCode, desdeNext.headers);
        desdeNext.pipe(respuesta);
      },
    );

    haciaNext.on("error", () => {
      if (respuesta.headersSent) {
        respuesta.destroy();
      } else {
        respuesta.writeHead(502, {
          "Content-Type": "text/plain; charset=utf-8",
        });
        respuesta.end(
          "LocalPixel no está disponible. Comprueba que Next.js esté iniciado.",
        );
      }
    });

    respuesta.on("close", () => haciaNext.destroy());
    peticion.pipe(haciaNext);
  },
);

servidorSeguro.listen(Number(origen.port), direccion, () => {
  http
    .createServer((peticion, respuesta) => {
      const ruta = peticion.url?.startsWith("/") ? peticion.url : "/";
      respuesta.writeHead(308, { Location: `${origen.origin}${ruta}` });
      respuesta.end();
    })
    .listen(3080, direccion, () => {
      console.log(`http://localhost:3080 redirige a ${origen.origin}`);
    });
});
