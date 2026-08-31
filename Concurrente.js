// 1. Definimos la URL base que nos da el documento
const URL_BASE = "https://rickandmortyapi.com/api/character";

async function obtenerTodosLosPersonajes() {
  try {
    console.time("Tiempo Concurrente"); // Iniciamos el cronómetro

    // ==========================================
    // PASO 1: Descubrir cuántas páginas existen
    // ==========================================
    // Hacemos una petición inicial solo a la primera página.
    // La API nos devolverá el objeto "info" con el total de páginas.
    const respuestaInicial = await fetch(URL_BASE);
    const datosIniciales = await respuestaInicial.json();
    const totalPaginas = datosIniciales.info.pages; 
    
    console.log(`¡Encontradas ${totalPaginas} páginas en total!`);

    // ==========================================
    // PASO 2: Preparar el terreno (Sin bucles)
    // ==========================================
    // Creamos un arreglo con números del 1 al totalPaginas.
    // Array.from nos ayuda a crear el arreglo, y usamos el segundo parámetro 
    // que funciona exactamente igual que un .map() para generar las URLs.
    const listaDeUrls = [];
    for (let i = 1; i <= totalPaginas; i++) 
        {
            listaDeUrls.push(`${URL_BASE}?page=${i}`);
        }

    // ==========================================
    // PASO 3: El primer Promise.all (La Red)
    // ==========================================
    // Transformamos las URLs en peticiones asíncronas con .map()
    // y disparamos todas a la vez.
    const promesasDeRed = listaDeUrls.map(url => fetch(url));
    const respuestasCrudas = await Promise.all(promesasDeRed);

    // ==========================================
    // PASO 4: El segundo Promise.all (El Desempaque)
    // ==========================================
    // Extraemos el JSON de cada respuesta. Recuerda que .json() 
    // también es una promesa, por eso usamos Promise.all de nuevo.
    // ==========================================
    // PASO 4: El segundo Promise.all (El Desempaque seguro)
    // ==========================================
    const promesasDeJson = respuestasCrudas.map(respuesta => {
      // Validamos si la respuesta del servidor fue exitosa (código 200)
      if (!respuesta.ok) {
        throw new Error(`El servidor bloqueó la página. Código de estado: ${respuesta.status}`);
      }
      return respuesta.json();
    });
    

    const paginasDesempacadas = await Promise.all(promesasDeJson);

    // ==========================================
    // PASO 5: Unificar los datos (Usando reduce)
    // ==========================================
    // En este punto, 'paginasDesempacadas' es un arreglo de páginas, 
    // y cada página tiene un arreglo 'results' por dentro.
    // El taller exige que todos los personajes queden en un único arreglo.
    // ¡Es el momento perfecto para usar reduce!
    const todosLosPersonajes = paginasDesempacadas.reduce((acumulador, paginaActual) => {
      // Tomamos lo que ya tenemos y le concatenamos los resultados de la página actual
      return acumulador.concat(paginaActual.results);
    }, []);

    console.timeEnd("Tiempo Concurrente"); // Detenemos el cronómetro
    
    console.log(`¡Éxito! Se descargaron ${todosLosPersonajes.length} personajes en un solo arreglo.`);
    
    // Retornamos los datos para poder usarlos en el resto del taller
    return todosLosPersonajes;

  } catch (error) {
    console.error("Hubo un error en la Matrix:", error);
  }
}

// Ejecutamos la función
const personajes = await obtenerTodosLosPersonajes();

