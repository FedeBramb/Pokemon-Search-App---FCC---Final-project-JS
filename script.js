const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const imgContainer = document.querySelector(".imgContainer");
const statsDiv = document.getElementById("stats_container");

const pokemonName = document.getElementById("pokemon-name");
const id = document.getElementById("pokemon-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const types = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const sAttack = document.getElementById("special-attack");
const sDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");


//looppare attraverso i nomi dei pokemon, e controllare se searchInput === nome del pokemon
 
//ripulire l'input  sostituisci gli spazi con trattini e rimuovi eventuali caratteri speciali, mantenendo il nome in minuscolo
const formatInput = () => {
    // Rimpiazza i caratteri ♀, ♂, ., space e converte in minuscolo
    const cleanInput = searchInput.value.replace(/♀/g, '-f').replace(/♂/g, '-m').replace(/\./g, '-').replace(/\s/g, '').toLowerCase();
    return cleanInput;
}

const getPokemonData = async (pokemonName) => {
  try {
    const apiUrl = `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemonName}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      alert("Pokémon not found");
    }

    const pokemonData = await response.json();
    return pokemonData; // Restituisci i dati invece di aggiornare l'interfaccia utente direttamente
  } catch (error) {
    console.error(`Si è verificato un errore: ${error.message}`);
    throw error; // Rilancia l'errore per gestirlo eventualmente altrove
  }
}


const updateUi = (pokemonData) => {
  pokemonName.textContent = pokemonData.name.toUpperCase();
  id.innerHTML = `<span>#${pokemonData.id}</span>`;
  imgContainer.innerHTML = `<img id="sprite" src="${pokemonData.sprites.front_default}" alt="${pokemonData.name} sprite">`;
  weight.innerHTML = `<span>Weight: ${pokemonData.weight}</span>`;
  height.innerHTML = `<span>Height: ${pokemonData.height}</span>`;
  types.innerHTML = pokemonData.types
      .map(obj => `<span class="type ${obj.type.name}">${obj.type.name}</span>`)
      .join('');
  
  //typesTwo.innerHTML += `<span class="type ${pokemonData.types[1].type.name}">${pokemonData.types[1].type.name}</span>`;
  hp.innerHTML = `<span>${pokemonData.stats[0].base_stat}</span>`;
  attack.innerHTML = `<span>${pokemonData.stats[1].base_stat}</span>`;
  defense.innerHTML = `<span>${pokemonData.stats[2].base_stat}</span>`;
  sAttack.innerHTML = `<span>${pokemonData.stats[3].base_stat}</span>`;
  sDefense.innerHTML = `<span>${pokemonData.stats[4].base_stat}</span>`;
  speed.innerHTML = `<span>${pokemonData.stats[5].base_stat}</span>`;
}

const uiElements = [
  pokemonName, id, imgContainer, weight, height, types, hp, attack, defense, sAttack, sDefense, speed
];

const resetUi = () => {
  uiElements.forEach(element => {
    element.innerHTML = "";
  });
}

// Quando il Search Button viene cliccato, viene chiamata formatInput() e restituisce il nome del
// pokemon, utilizzato come argomento da getPokemonData.
searchBtn.addEventListener("click", async () => {
  const pokemonInput = formatInput();
  try {
    resetUi();
    const pokemonData = await getPokemonData(pokemonInput);
    updateUi(pokemonData);
  } catch (error) {
    console.error(`Si è verificato un errore: ${error.message}`);
    // Gestisci l'errore, ad esempio, mostra un messaggio all'utente
  }
});

