export function getPokemonsById(id) {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((response) =>
      response.json()
    );
  }

  export function getPokemons(url) {
    return fetch(`${url}`).then((resp) => resp.json());
  }


  export function getPokemonUrl(pokemon) {
    return fetch(`${pokemon.url}`).then((response) => response.json());
  }