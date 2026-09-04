export function ejecutarConsultas(personajes) {
    const personajesVivos = personajes.filter(personaje =>
        personaje.estado === "Alive" && personaje.especie === "Human"
    );

    const personajesEpisodios = personajes.filter(personaje =>
        personaje.cantidadEpisodios >= 20
    );

    const personajeFind = personajes.find(personaje =>
        personaje.especie === "Alien" && personaje.genero === "Female"
    );

    const personajeSome = personajes.some(personaje =>
        personaje.tipo !== ""
    );

    const personajeEvery = personajes.every(personaje =>
        personaje.imagen !== "" && personaje.cantidadEpisodios > 0
    );

    const personajeEspecies = personajes.reduce((especies, personaje) => {
        const especie = personaje.especie;

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
            (totalEpisodiosAnterior + personaje.cantidadEpisodios) / datos.cantidad;

        if (personaje.estado === "Alive") {
            datos.vivos += 1;
        }

        return especies;
    }, {});

    const personajesPorEpisodios = personajes.reduce((clasificacion, personaje) => {
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

    console.log("\nConsulta 1: Personajes vivos de especie humana");
    console.table(personajesVivos);

    console.log("\nConsulta 2: Personajes que aparecen en 20 o más episodios");
    console.table(personajesEpisodios);

    console.log("\nConsulta 3: Primera mujer alienígena encontrada");
    console.log(personajeFind);

    console.log("\nConsulta 4: ¿Existe algún personaje con tipo definido?");
    console.log(personajeSome ? "Sí" : "No");

    console.log("\nConsulta 5: ¿Todos tienen imagen y al menos un episodio?");
    console.log(personajeEvery ? "Sí" : "No");

    console.log("\nConsulta 6: Resumen de personajes por especie");
    console.table(
        Object.entries(personajeEspecies).map(([especie, datos]) => ({
            especie,
            ...datos,
            promedioEpisodios: datos.promedioEpisodios.toFixed(2)
        }))
    );

    console.log("\nConsulta 7: Personajes clasificados por cantidad de episodios");
    console.table(
        Object.entries(personajesPorEpisodios).map(([rango, cantidad]) => ({
            rango,
            cantidad
        }))
    );

    return {
        personajesVivos,
        personajesEpisodios,
        personajeFind,
        personajeSome,
        personajeEvery,
        personajeEspecies,
        personajesPorEpisodios
    };
}
