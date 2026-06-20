const POKEAPI_URL = "https://pokeapi.co/api/v2";
const pokemonList = document.getElementById("pokemons");

const loadPokemons = async () => {
    try {
        const response = await fetch(`${POKEAPI_URL}/pokemon`).then(response => response.json());
        response.results.forEach(pokemon => {
            const option = document.createElement("option");
            option.textContent = pokemon.name;
            option.value = pokemon.url;
            pokemonList.appendChild(option);
        });
    } catch (error) {
        console.error("Error fetching pokemons:", error);
    }
}

loadPokemons();

const pokemonSelected = async (pokemonUrl) => {
    try {

        const response = await fetch(pokemonUrl).then(response => response.json());

        const pokemonImage = document.getElementById("pokemon-image");
        const pokemonName = document.getElementById("pokemon-name");
        const pokemonAbilities = document.getElementById("pokemon-abilities");
        const pokemonStats = document.getElementById("pokemon-stats");
        const pokemonTypeBadge = document.getElementById("pokemon-type-badge");

        pokemonImage.src = response.sprites.front_default;
        pokemonImage.alt = `Imagen de ${response.name}`;
        pokemonName.textContent = response.name;
        pokemonAbilities.textContent = `Habilidades: ${response.abilities.map(abilityInfo => abilityInfo.ability.name).join(', ')}`;
        pokemonTypeBadge.textContent = `Tipo: ${response.types.map(typeInfo => typeInfo.type.name).join(', ')}`;

        pokemonStats.innerHTML = "";

        response.stats.forEach(stat => {
            const li = document.createElement("li");
            li.textContent = `${stat.stat.name}: ${stat.base_stat}`;
            pokemonStats.appendChild(li);

        })
    } catch (error) {
        console.error("Error fetching pokemon details:", error);
    }
}
