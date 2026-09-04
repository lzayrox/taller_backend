const personajesPrueba = [
    {
        id: 1,
        nombre: "Rick Sanchez",
        estado: "Alive",
        especie: "Human",
        tipo: "",
        genero: "Male",
        origen: "Earth (C-137)",
        ubicacionActual: "Citadel of Ricks",
        cantidadEpisodios: 51,
        imagen: "https://rickandmortyapi.com/api/character/avatar/1.jpeg"
    },
    {
        id: 4,
        nombre: "Beth Smith",
        estado: "Alive",
        especie: "Human",
        tipo: "",
        genero: "Female",
        origen: "Earth (Replacement Dimension)",
        ubicacionActual: "Earth (Replacement Dimension)",
        cantidadEpisodios: 42,
        imagen: "https://rickandmortyapi.com/api/character/avatar/4.jpeg"
    },
    {
        id: 6,
        nombre: "Abadango Cluster Princess",
        estado: "Alive",
        especie: "Alien",
        tipo: "",
        genero: "Female",
        origen: "Abadango",
        ubicacionActual: "Abadango",
        cantidadEpisodios: 1,
        imagen: "https://rickandmortyapi.com/api/character/avatar/6.jpeg"
    }
];

personajesVivos = personajesPrueba.filter(personaje =>
    personaje.estado == "Alive" && personaje.especie == "Human"
);

personajesEpisodios = personajesPrueba.filter(personaje =>
    personaje.cantidadEpisodios >= 20
);

pesonajeFind = personajesPrueba.find(personaje =>
    personaje.especie == "Alien" && personaje.genero == "Female"
);

personajeSome = personajesPrueba.some(personaje =>
    personaje.tipo !== ""
);

personajeEvery = personajesPrueba.every(personaje =>
    personaje.imagen !== "" && personaje.cantidadEpisodios > 0
);

personajeEspecies = personajesPrueba.reduce((especies, personaje) => {
    const especie = personaje.especie

    if (!especies[especie]) {
        especies[especie] = {
            cantidad: 0,
            promedioEpisodios: 0,
            vivos: 0,
        };
    }

    const datos = especies[especie];

    const totalEpisodiosAnterior = datos.promedioEpisodios * datos.cantidad;

    datos.cantidad += 1;

    datos.promedioEpisodios =
        (totalEpisodiosAnterior + personaje.cantidadEpisodios) / datos.cantidad

    if (personaje.estado === "Alive") {
        datos.vivos += 1;
    }

    return especies
}, {});

const personajesPorEpisodios = personajesPrueba.reduce((clasificacion, personaje) => {
    const episodios = personaje.cantidadEpisodios;

    if (episodios >= 1 && episodios <= 5) {
        clasificacion["1-5"]++;
    } else if (episodios <= 15) {
        clasificacion["6-15"]++;
    } else if (episodios <= 30) {
        clasificacion["16-30"]++;
    } else {
        clasificacion["30+"]++;
    }

    return clasificacion;
}, {
    "1-5": 0,
    "6-15": 0,
    "16-30": 0,
    "30+": 0
});

console.log(personajesPorEpisodios);
