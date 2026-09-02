const URL_Base = "https://rickandmortyapi.com/api/character";
const esperar = (milisegundos) => new Promise(resolve => setTimeout(resolve, milisegundos));

async function concurrentePorLotes() {
  try {
    console.time("El tiempo Concurrente es de: ");

    const resInicial = await fetch(URL_Base);
    const dataInicial = await resInicial.json();
    const totalPag = dataInicial.info.pages;

    const listaDeUrls = [];
    for (let i = 1; i <= totalPag; i++) {
      listaDeUrls.push(`${URL_Base}?page=${i}`);
    }

    //  Trocear en grupos de 5 utilizando reduce
    const lotes = listaDeUrls.reduce((acumulador, url, indice) => {
      const indiceLote = Math.floor(indice / 5);
      if (!acumulador[indiceLote]) acumulador[indiceLote] = [];
      acumulador[indiceLote].push(url);
      return acumulador;
    }, []);


    let todosLosPersonajes = [];
    // 3. Procesar cada lote
    for (const lote of lotes) {
      // Usamos map para transformar los números de página en Promesas
      const promesasFetch = lote.map(url =>
        fetch(url).then(res => res.json())
      );

      // Promise.all ejecuta este pequeño grupo al mismo tiempo
      const resultadosLote = await Promise.all(promesasFetch);

      // Extraemos y aplanamos los personajes 
      const personajesLote = resultadosLote
        .map(data => data.results)
        .reduce((acc, personajes) => acc.concat(personajes), []);


      todosLosPersonajes = todosLosPersonajes.concat(personajesLote);

      console.log(`Lote procesado. Descargados: ${todosLosPersonajes.length}`);

      // Pausa de 1.3 segundos entre cada lote para no que no se sature  la API
      await esperar(2000);
    }

    console.timeEnd("El tiempo Concurrente es de: ");

    // Normalizamos cada personaje a la estructura que pide el taller
    const normalizados = todosLosPersonajes.map(personaje =>
      ({
        id: personaje.id,
        nombre: personaje.name,
        estado: personaje.status,
        especie: personaje.species,
        tipo: personaje.type,
        genero: personaje.gender,
        origen: personaje.origin.name,
        ubicacionActual: personaje.location.name,
        cantidadEpisodios: personaje.episode.length,
        imagen: personaje.image
      })
    );
    console.log(`Total: ${normalizados.length}`);
    console.log(normalizados[0]);
    return normalizados;


  } catch (error) {
    console.error("Hubo un error durante la ejecución:", error);
  }
}

export { concurrentePorLotes };

concurrentePorLotes();