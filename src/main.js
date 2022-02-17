
import {getPokemonsById,getPokemons,getPokemonUrl} from './services.js'

import {deleteCards,createCard,setModal } from './ui.js'
 

function setNextButton(url) {
  const $nextButton = document.querySelector("#next-btn");

  $nextButton.onclick = () => {
    const nextUrl = url;
    if (nextUrl.length !== 0) {
      deleteCards();

      handleQuery(nextUrl);
    } else {
      console.error("Error: aún no hay datos");
    }
  };
}

function setPreviousButton(url) {
  const $previousButton = document.querySelector("#previous-btn");
  $previousButton.onclick = () => {
    const previousUrl = url;

    if (previousUrl !== "" && previousUrl !== null) {
      deleteCards();

      handleQuery(previousUrl);
    } else {
      console.error("Error: no hay página previa");
    }
  };
}




function $handleDetails() {
  const detailButtons = document.querySelectorAll(".detail");

  detailButtons.forEach((button) => {
    button.onclick = () => {
      const pokemonId = button.parentElement.parentElement.id;

      getPokemonsById(pokemonId).then((pokemon) => setModal(pokemon));
    };
  });
}



function setNextAndPreviousUrl(nextUrl, previousUrl, urlInfo) {
  (nextUrl = urlInfo.next), (previousUrl = urlInfo.previous);

  return [nextUrl, previousUrl];
}


function handleQuery(url) {
  let nextUrl = "";
  let previousUrl = "";
  getPokemons(url)
    .then((response) => {
      let changePageUrls = setNextAndPreviousUrl(
        nextUrl,
        previousUrl,
        response
      );

      setNextButton(changePageUrls[0]);
      setPreviousButton(changePageUrls[1]);

      let pokemons = response.results;

      return pokemons;
    })
    .then((pokemons) => {
      pokemons.forEach((pokemon) => {
        getPokemonUrl(pokemon).then((pokemonUrl) => {
          createCard(pokemonUrl);
          $handleDetails();
        });
      });
    });
}



const firstUrl = "https://pokeapi.co/api/v2/pokemon?limit=10";

handleQuery(firstUrl);
