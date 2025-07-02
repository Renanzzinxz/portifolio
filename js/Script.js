const pokemonName = document.querySelector('.pokemon_name'); 
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-Next');


let searchPokemon = 1;

const fetchpokemon = async (pokemon) => {
  try {
    const APIResponsive = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    
    if (APIResponsive.status === 200) { 
      const data = await APIResponsive.json();
      return data;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Erro na API:', error);
    return null;
  }
};

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'loading...'
    pokemonNumber.innerHTML = ''

  const data = await fetchpokemon(pokemon);

  if (data) {
    pokemonImage.computedStyleMap.display = 'block';
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src =
      data["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_default"];
    input.value = '';
    searchPokemon = data.id;
    } else {
    pokemonImage.computedStyleMap.display = 'none';
    pokemonName.innerHTML = 'Not found :c';
    pokemonNumber.innerHTML = '';
    pokemonImage.src = ''; 
  }
};

form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value);
});


form.addEventListener('submit', (event) =>{
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () =>{
    if (searchPokemon > 1){
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
    }
});
buttonNext.addEventListener('click', () =>{
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon)


