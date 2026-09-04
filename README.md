# Taller Backend - Rick and Morty

Proyecto de práctica en JavaScript que consume la API de Rick and Morty,
normaliza los datos de los personajes y realiza consultas sobre ellos.

## Requisitos

- Node.js 18 o superior.
- pnpm (recomendado) o npm.

## Instalación y ejecución

```bash
pnpm install
pnpm run start
```

Para ejecutar las pruebas:

```bash
pnpm run test
```

También puedes usar npm:

```bash
npm install
npm run start
```

## Consultas realizadas

- Personajes humanos que están vivos.
- Personajes que aparecen en 20 o más episodios.
- Primera mujer alienígena encontrada.
- Verificación de personajes con tipo definido.
- Verificación de imagen y episodios para todos los personajes.
- Resumen de personajes por especie.
- Clasificación por cantidad de episodios.

## Estructura

```text
src/
├── consultas/
│   └── consultaPersonajes.js
├── servicios/
│   └── obtenerDatos.js
└── index.js
```

- `obtenerDatos.js`: obtiene y normaliza los personajes desde la API.
- `consultaPersonajes.js`: contiene la función `ejecutarConsultas`.
- `index.js`: ejecuta el programa.
