// Defino una variable global para guardar todos los géneros.
let currentGenderFilter = "todos";

// Función para filtrar personajes por género.
const filterCharactersByGender = (gender) => {
    // Actualizo el género actualmente seleccionado.
    currentGenderFilter = gender;

    // Reinicio la página actual a 1.
    currentPage = 1;

    // Llamo a la función para obtener y mostrar los personajes con el nuevo filtro.
    getCharacters(currentPage);
};

// Obtengo el contenedor principal donde se mostrarán las tarjetas de personajes.
const container = document.getElementById("container");

// Establezco la página actual en 1 para comenzar a cargar la primera página de personajes.
let currentPage = 1;

// Para los botones de anterior, siguiente, primera pagina y ultima pagina" 
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const firstPageButton = document.getElementById("firstPageButton");
const lastPageButton = document.getElementById("lastPageButton");
const currentPageIndicator = document.getElementById("currentPageNumber");

// Número total de páginas (42 estaba en la API).
const totalPages = 42;

// Modifique la función getCharacters para incluir el filtro de género.
const getCharacters = (page) => {
    // modifico la URL de la API con el número de página y el filtro de género.
    let apiUrl = `https://rickandmortyapi.com/api/character/?page=${page}`;

    if (currentGenderFilter !== "todos") {
        apiUrl += `&gender=${currentGenderFilter}`;
    }

    // Realizo una solicitud a la API utilizando la URL.
    fetch(apiUrl)
        .then(res => res.json())
        .then(data => renderCharacters(data.results));
};

// Defino la función para renderizar la información de paginación.
const renderPagination = () => {
    // Actualizo el indicador del número de página actual.
    currentPageIndicator.textContent = currentPage;

    // Habilito y deshabilito los botones Anterior y Siguiente según la página actual.
    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;

    // Habilito y deshabilito los botones Primera y Última Página según la página actual.
    firstPageButton.disabled = currentPage === 1;
    lastPageButton.disabled = currentPage === totalPages;
};

// Función para renderizar las tarjetas de personajes.
const renderCharacters = characters => {
    // Limpio el contenido del contenedor antes de mostrar los nuevos personajes.
    container.innerHTML = "";

    // Creo una tarjeta con la información de cada personaje.
    characters.forEach(character => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
        <img src="${character.image}" alt="">
        <h2>${character.name}</h2>
        <p>${character.species}</p>
        <button class="button" onclick="verDescription('${character.url}')">Ver más</button>`;

        // Agrego la tarjeta al contenedor para mostrarla en la página.
        container.appendChild(card);
    });

    // Llamo a la función para mostrar los botones de paginación.
    renderPagination();
};

// Agregar evento al botón "anterior" para ir a la página anterior.
prevButton.addEventListener("click", () => {
    // Verifico si la página actual es mayor que 1 antes de disminuir.
    if (currentPage > 1) {
        currentPage--;
        getCharacters(currentPage);
    }
});

// Agrego evento al botón "siguiente" para ir a la siguiente página.
nextButton.addEventListener("click", () => {
    if (currentPage < totalPages) {
         // Aumento la página actual.
        currentPage++;
        // Llamo a la función para obtener y mostrar personajes.
        getCharacters(currentPage); 
    }
});

// Agrego evento al botón de primera página para ir a la página 1.
firstPageButton.addEventListener("click", () => {
    // Verifico si la página actual es diferente de 1 antes de hacer el cambio.
    if (currentPage !== 1) {
        // Restablezco la página actual a 1.
        currentPage = 1;

        // Llamo a la función para obtener y mostrar personajes con la página actual.
        getCharacters(currentPage);
    }
});
// Agrego evento al botón ultima página para ir a la última página.
lastPageButton.addEventListener("click", () => {
    // Restablezco la página actual a la última página.
    currentPage = totalPages;
    
    // Llamo  a la función para obtener y mostrar personajes con la pagina actual.
    getCharacters(currentPage);

    // Actualizo el indicador del número de página.
    currentPageIndicator.textContent = totalPages;
});

// Función para mostrar la descripción detallada de un personaje.
const verDescription = characterUrl => {
    // Realizo una solicitud a la URL del personaje para obtener su información detallada.
    fetch(characterUrl)
        .then(res => res.json()) // Convierto la respuesta en JSON.
        .then(character => {
            // Limpio el contenedor antes de mostrar la descripción.
            container.innerHTML = "";

            // Creo una tarjeta con la información detallada del personaje.
            const card = document.createElement("div");
            card.className = "card-description";

            // Agrego un div para la imagen del personaje para darle un estilo distinto en css.
            const imageDiv = document.createElement("div");
            imageDiv.className = "card-image";
            imageDiv.innerHTML = `<img src="${character.image}" alt="">`;

            // Agrego la información detallada del personaje al div de la tarjeta en un div distinto.
            const infoDiv = document.createElement("div");
            infoDiv.className = "card-info";
            infoDiv.innerHTML = `
                <h2>${character.name}</h2>
                <p>Status: ${character.status}</p>
                <p>Especie: ${character.species}</p>
                <p>Género: ${character.gender}</p>
                <p>Origen: ${character.origin.name}</p>
                <p>Ubicación: ${character.location.name}</p>
                <p>Episodio: ${character.episode[0]}</p>
                <button class="button" onclick="getCharacters(currentPage)">Volver</button>
            `;

            // Agrego el div de la imagen y el div de la información a la tarjeta.
            card.appendChild(imageDiv);
            card.appendChild(infoDiv);

            // Agrego la tarjeta al contenedor para mostrarla en la página.
            container.appendChild(card);
        });
};

// Modifico los botones del menú para que llamen a la función de filtrado con el género correspondiente.
document.querySelectorAll(".menu button").forEach(button => {
    button.addEventListener("click", () => {
        filterCharactersByGender(button.getAttribute("data-gender"));
    });
});

// Llamo a la función para obtener y mostrar los personajes en la página inicial.
getCharacters(currentPage);
