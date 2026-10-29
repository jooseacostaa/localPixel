# LocalPixel

Proyecto académico UT2: inicio y navegación. Next.js, React, Tailwind CSS y TypeScript.

## Ejecutar

Necesitas Node.js 20.9 o superior.

```sh
npm install
npm run dev
```

Abre http://localhost:3000. Para detenerlo usa Ctrl+C.

## Comprobar

```sh
npm run build
```

## Estructura

- src/app: páginas, layout y estilos globales.
- src/components/layout: header y navegación compartidos.
- src/components/dashboard: cifras, accesos rápidos y actividad del inicio.
- src/components/auth: formulario compartido de acceso y registro.
- src/components/orders: formulario de pedido.
- src/components/theme: aplicación del tema y ajustes de apariencia.
- src/components/feedback: avisos de conexión y de acceso.

Las páginas de Next.js componen estas piezas. Las páginas sencillas de ayuda y listado mantienen su contenido en su ruta. Los datos estáticos están junto al componente que los utiliza.

- src/app/favicon.ico: favicon y logo del header.

## Etapas y commits

1. Base: chore: iniciar proyecto LocalPixel
2. Diseño y navegación: feat: añadir diseño base y navegación
3. Panel: feat: crear panel de inicio
4. Pantallas y tema: feat: añadir pantallas principales y tema oscuro
5. Acceso y feedback: feat: completar acceso y mensajes de usuario
6. Entrega: docs: preparar entrega y guía del proyecto

Esta entrega se centra en interfaz y navegación. La autenticación y los datos serán de demostración, sin backend ni CRUD.

No subir node_modules, .next ni archivos .env a GitHub.

## Formato del código

El proyecto utiliza Prettier con dos espacios de sangría. En VS Code, la extensión Prettier (`esbenp.prettier-vscode`) formateará al guardar.

```sh
npm run format
npm run format:check
```

Se excluyen las dependencias, las carpetas generadas y el archivo de bloqueo de npm.
