const URL_Bas = "https://rickandmortyapi.com/api/character";

async function consultasSecuenciales() {
  try {
    // Iniciar cronómetro  estrategia 1
    console.time("el Tiempo Secuencial es de: ");

    const espera = (milisegundos) => new Promise(resolver => setTimeout(resolver, milisegundos));
    const listaDeUrls = [];



    const respuestaI = await fetch(URL_Bas);
    const datosI = await respuestaI.json();
    const totalPag = datosI.info.pages;

    console.log(`Páginas encontradas: ${totalPag}.`);

    // Arreglo donde guardaremos todos los personajes
    let todosLosPersonajes = [];


    for (let i = 1; i <= totalPag; i++) {
      const respuesta = await fetch(`${URL_Bas}?page=${i}`);
      const datos = await respuesta.json();
      if (!respuesta.ok) {
        throw new Error(`Error descargando  página ${i}. Código de estado: ${respuesta.status}`);
      }

      todosLosPersonajes = todosLosPersonajes.concat(datos.results);

      console.log(`pagina ${i} descargada`);

      await espera(300); // Se espera 0.28 segundo entre cada solicitud para que no se sature la API

    }

    // Detenemos el cronómetro
    console.timeEnd("el Tiempo Secuencial es de: ");



    console.log(`¡exito! Personajes totales: ${todosLosPersonajes.length}`);
    return todosLosPersonajes;

  } catch (error) {
    console.error("Hubo un error en la consulta secuencial:", error);
  }
}


consultasSecuenciales();