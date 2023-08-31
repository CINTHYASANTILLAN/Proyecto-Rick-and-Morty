// Creo contenedor para mostrar todos los personajes
const container = document.getElementById("container");

// Establezco la página actual en 1 para comenzar a cargar la primera página.
let currentPage = 1;

// Para los botones de "Anterior" y "Siguiente" en el HTML
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");

// Agrego evento a los botones de "Anterior" y "Siguiente"
prevButton.addEventListener("click", () => {
    // Si la página actual es mayor que 1, disminuyo y cargo la página anterior.
    if (currentPage > 1) {
        currentPage--;
        getCharacters(currentPage);
    }
});

nextButton.addEventListener("click", () => {
    // Aumento la página actual y cargo la siguiente página.
    currentPage++;
    getCharacters(currentPage);
});


// Defino una función para obtener y mostrar los personajes de la página especificada.
const getCharacters = (page) => {
    // Realizo una solicitud a la API utilizando el número de página proporcionado.
    fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
        .then(res => res.json())
        .then(data => renderCharacters(data.results)); // Llamo a la función para mostrar los personajes.
};

// Llamo a la función para obtener y mostrar los personajes de la página actual.
getCharacters(currentPage);

// Defino una función para los personajes en tarjetas.
const renderCharacters = characters => {
    // Limpio el contenido del contenedor antes de mostrar los nuevos personajes.
    container.innerHTML = "";

    // Creo una tarjeta con la información de cada personaje.
    characters.forEach(character => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = 
        `<img src="${character.image}" alt="">
        <h2>${character.name}</h2>
        <p>${character.species}</p>
        <button class="button" onclick="verDescription('${character.url}')">Ver más</button>`;
       
        // Agrego la tarjeta al contenedor para mostrarla en la página.
        container.appendChild(card);
    });

    // Llamo a la función para mostrar los botones de paginación.
    renderPagination();
};

// Defino una función para los botones de paginación.
const renderPagination = () => {
    // Creo un nuevo elemento 'div' para contener los botones de paginación.
    const pagination = document.createElement("div");
    pagination.className = "pagination";

    // Agrego los botones de paginación al elemento de paginación.
    pagination.appendChild(prevButton);
    pagination.appendChild(nextButton);

    // Agrego el elemento de paginación al contenedor para mostrarlo en la página.
    container.appendChild(pagination);
};

// Defino una función para mostrar la descripción detallada de un personaje.
const verDescription = characterUrl => {
    // Realizo una solicitud a la URL del personaje para obtener su información detallada.
    fetch(characterUrl)
        .then(res => res.json())
        .then(character => {
            // Limpio el contenido del contenedor antes de mostrar la descripción.
            container.innerHTML = "";

            // Creo una tarjeta con la información detallada del personaje.
            const card = document.createElement("div");
            card.className = "card";
            card.innerHTML = 
            `   <h2>${character.name}</h2>
                <img src="${character.image}" alt="">
                <p>${character.status}</p>
                <p>${character.species}</p>
                <p>${character.gender}</p>
                <p>${character.origin.name}</p>
                <p>${character.location.name}</p>
                <p>${character.episode.name}</p>
              <button class="button" onclick="getCharacters(currentPage)">Volver</button>`;
            // Agrego la tarjeta al contenedor para mostrarla en la página.
            container.appendChild(card);
        });
};

