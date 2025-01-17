
const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');

const maxRecords = 151;
const limit = 8;
let offset = 0;

function verDetalhes(pokemonId){
    window.location.href = `detail.html?id=${pokemonId}` 
}

function pad(number, length) {
    var str = '' + number;
    while (str.length < length) {
        str = '0' + str;
    }
    return str;
}

function loadPokemonItems(offset, limit){
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pad(pokemon.number,3)}</span>
                <span class="name">${pokemon.name}</span>
                        
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
        
                    <img src="${pokemon.photo}"
                        alt="${pokemon.name}">

                    <button class="button ${pokemon.type} id="detail_btn" onclick="verDetalhes(${pokemon.number})">...</button>
                </div>

            </li>
        `).join('');
        pokemonList.innerHTML += newHtml;
    })
}

loadPokemonItems(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit

    const qtdRecordWithNextPage = offset + limit;

    if(qtdRecordWithNextPage >= maxRecords){
        const newLimit = maxRecords - offset;
        loadPokemonItems(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        loadPokemonItems(offset, limit)
    }  
})
