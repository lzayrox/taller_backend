import { ejecutarConsultas } from "./consultas/consultaPersonajes.js";
import { concurrentePorLotes } from "./servicios/obtenerDatos.js";

const personajes = await concurrentePorLotes();

if (personajes) {
    ejecutarConsultas(personajes);
}
