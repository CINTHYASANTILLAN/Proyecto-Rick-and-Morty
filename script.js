// Defino una variable global para almacenar todos los generos.
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

// Obtengo el contenedor principal donde se mostrarán las card de los personajes.
const container = document.getElementById("container");

// Establezco la página actual en 1 para comenzar a cargar la primera página de personajes.
let currentPage = 1;

// Para los botones de "Anterior" y "Siguiente" 
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");

// Modifico la función getCharacters para incluir el filtro de género.
const getCharacters = (page) => {
    // Construyo la URL de la API con el número de página y el filtro de género.
    let apiUrl = `https://rickandmortyapi.com/api/character/?page=${page}`;
    
    if (currentGenderFilter !== "todos") {
        apiUrl += `&gender=${currentGenderFilter}`;
    }

    // Realizo una solicitud a la API utilizando la URL.
    fetch(apiUrl)
        .then(res => res.json())
        .then(data => renderCharacters(data.results));
};

// Modifico los botones del menú para que llamen a la función de filtrado con el género correspondiente.
document.querySelectorAll(".menu button").forEach(button => {
    button.addEventListener("click", () => {
        filterCharactersByGender(button.getAttribute("data-gender"));
    });
});

// Cuando se hace clic en el botón "Anterior," disminuyo la página actual y cargo la página anterior.
prevButton.addEventListener("click", () => {
    // Verifico si la página actual es mayor que 1 antes de disminuir.
    if (currentPage > 1) {
        currentPage--;
        getCharacters(currentPage);
    }
});

// Cuando se hace clic en el botón "Siguiente," aumento la página actual y cargo la siguiente página.
nextButton.addEventListener("click", () => {
    currentPage++; // Aumento la página actual.
    getCharacters(currentPage); // Llamo a la función para obtener y mostrar personajes.
});

// Función para renderizar las tarjetas de personajes.
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

// Función para los botones de paginación.
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

// Función para mostrar la descripción detallada de un personaje.
const verDescription = characterUrl => {
    // Realizo una solicitud a la URL del personaje para obtener su información detallada.
    fetch(characterUrl)
        .then(res => res.json()) // Convierto la respuesta en JSON.
        .then(character => {
            // Limpio el contenido del contenedor antes de mostrar la descripción.
            container.innerHTML = "";

             // Creo una tarjeta con la información detallada del personaje.
             const card = document.createElement("div");
             card.className = "card-description";
 
             // Agrego un div para la imagen del personaje.
             const imageDiv = document.createElement("div");
             imageDiv.className = "card-image";
             imageDiv.innerHTML = `<img src="${character.image}" alt="">`;
 
             // Agrego la información detallada del personaje al div de la tarjeta.
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
// Llamo a la función para obtener y mostrar los personajes de la página actual (primero la página 1 con el filtro todos)
getCharacters(currentPage);
