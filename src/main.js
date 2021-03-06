function handleDetails() {
  const detailButtons = document.querySelectorAll('.detail');

  detailButtons.forEach((button) => {
    button.onclick = () => {
      const pokemonId = button.parentElement.parentElement.id;

      handlePokemonById(pokemonId);
    };
  });
}

function deleteCards() {
  const cards = document.querySelectorAll('.card');

  cards.forEach((card) => {
    card.remove();
  });
}

function createCard(pokemon) {
  const $pokemonContainer = document.querySelector('#pokemon-container');

  const newCard = document.createElement('div');
  newCard.setAttribute('class', 'card mx-2 mb-3 mt-3');
  newCard.setAttribute('id', `${pokemon.id}`);
  newCard.style.width = '12rem';

  newCard.innerHTML = `
    <img src="${pokemon.sprites.front_default}" class="card-img-top" alt="${pokemon.name}">
    <div class="card-body">
      <h5 class="card-title">${pokemon.name}</h5>
      <p class="card-text"> </p>
     
      <button type="button" class="btn btn-warning detail" data-bs-toggle="modal" data-bs-target="#exampleModalCenter">
         Ver detalles
        </button>
  
    `;

  $pokemonContainer.appendChild(newCard);
}

function setModal(info) {
  const $modal = document.querySelector('#exampleModalCenter');
  $modal.innerHTML = `
    
    <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">${info.name}</h5>
       <!--  <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button> -->
      </div>
      <div class="modal-body bg-primary">
      
      <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="${info.sprites.front_default}" class="d-block w-100" alt="${info.name}">
    </div>
    <div class="carousel-item">
    <img src="${info.sprites.back_default}" class="d-block w-100" alt="${info.name}">
    </div>
   <p>Peso : ${info.weight} Altura: ${info.height} Habilidad: ${info.abilities[0].ability.name} </p> 

  </div>
  <button  class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span id="test" class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
       
      </div>
    </div>
  </div>
 
    
    `;
}

function handlePokemonById(id) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then((resp) => resp.json())
    .then((resp) => {
      setModal(resp);
    });
}

function handlePokemons(url, nextUrl, previousUrl) {
  fetch(`${url}`)
    .then((resp) => resp.json())
    .then((resp) => {
      nextUrl[0] = resp.next;
      previousUrl[0] = resp.previous;

      const newPokemons = resp.results;

      newPokemons.forEach((pokemon) => {
        fetch(`${pokemon.url}`)
          .then((response) => response.json())
          .then((response) => {
            createCard(response);
            handleDetails();
          });
      });
    });
}

const $getButton = document.querySelector('#get-btn');
const $nextButton = document.querySelector('#next-btn');
const $previousButton = document.querySelector('#previous-btn');

const firstUrl = 'https://pokeapi.co/api/v2/pokemon?limit=10';
const nextUrl = [];
const previousUrl = [];

$previousButton.onclick = () => {
  if (previousUrl.length !== 0 && previousUrl[0] !== null) {
    deleteCards();
    handlePokemons(previousUrl[0], nextUrl, previousUrl);
  } else {
    console.error('no se puede realizar la petici??n ERROR');
  }
};

$nextButton.onclick = () => {
  if (nextUrl.length !== 0) {
    deleteCards();
    handlePokemons(nextUrl[0], nextUrl, previousUrl);
  } else {
    console.error('no se puede realizar la petici??n ERROR');
  }
};

$getButton.onclick = () => {
  $getButton.classList.add('disabled');

  handlePokemons(firstUrl, nextUrl, previousUrl);
};
