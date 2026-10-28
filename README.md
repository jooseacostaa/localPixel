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
- public: recursos estáticos; el logo definitivo se incorporará más adelante.

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
