
const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 1
let offset = 0;

function convertPokemonToList(pokemon) {
    return `
     

        <div class="pokemon ${pokemon.type}">
         <div class="pagination">
            <button id="loadMoreButton" type="button">
                Voltar
            </button>
            <div>img</div>
        </div>

        <span class="name">${pokemon.name}</span>
            <span class="number">#${pokemon.number}</span>
           

            <div class="detail">
                <div class="types">
                  ${pokemon.types.map((type) => `<div class="type ${type}">${type}</div>`).join('')}
                </div>
            </div>
            <div class="photo">
            <img  src="${pokemon.photo}"
            alt="${pokemon.name}">
   <div>
            

        </div>
      
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToList).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})