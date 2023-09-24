function exibirDetalhesPokemon() {
    const urlParams = new URLSearchParams(window.location.search);
    const pokemonId = urlParams.get("id");
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`;
    
    
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => DetailsPokePage(jsonBody))
        .catch((error) => console.log(error));
}

function pad(number, length) {
  var str = '' + number;
  while (str.length < length) {
      str = '0' + str;
  }
  return str;
}
    
function DetailsPokePage(detailsPoke) {
    
    const pokemonsDetails = new PokeStats(); 
    pokemonsDetails.name = detailsPoke.name;
    pokemonsDetails.number = detailsPoke.id;

    const types = detailsPoke.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;

    pokemonsDetails.types = types;
    pokemonsDetails.type = type;

    const abilities = detailsPoke.abilities.map((abilitySlot) => abilitySlot.ability.name);
    const [ability] = abilities;

    pokemonsDetails.abilities = abilities;
    pokemonsDetails.ability = ability;

    pokemonsDetails.height = detailsPoke.height / 10;
    pokemonsDetails.weight = detailsPoke.weight / 10;

    pokemonsDetails.photo = detailsPoke.sprites.front_default;

    pokemonsDetails.hp = detailsPoke.stats[0].base_stat;
    pokemonsDetails.atk = detailsPoke.stats[1].base_stat;
    pokemonsDetails.def = detailsPoke.stats[2].base_stat;
    pokemonsDetails.sp_atk = detailsPoke.stats[3].base_stat;
    pokemonsDetails.sp_def = detailsPoke.stats[4].base_stat;
    pokemonsDetails.speed = detailsPoke.stats[5].base_stat;
    
    return exibirDetalhes(pokemonsDetails);
}

function exibirDetalhes(pokemon) {
    const detailsContainer = document.getElementById("cardList");
    
    const detalhes = document.createElement("div");
    detalhes.classList.add("detalhe");

    const poke_num_pad = pad(pokemon.number, 3);
    
    var proximo_num = pokemon.number + 1;
    var proximo_num_pad = 0;
    if(proximo_num > 151){
      proximo_num = 1;
      proximo_num_pad = pad(proximo_num, 3);
    }else{
      proximo_num_pad = pad(proximo_num, 3);
    }
    
    var num_anterior = pokemon.number - 1;
    var num_anterior_pad = 0;
    if(num_anterior < 1){
      num_anterior = 151;
      num_anterior_pad = pad(num_anterior, 3);
    }else{
      num_anterior_pad = pad(num_anterior, 3);
    }


    
    detalhes.innerHTML = `
      <div class="card ${pokemon.type}">
        <div class="card_header"> 
            
          <section class="icons">
              <div class="arrow">
                <a href="../index.html"><span>&#8592;</span></a>
              </div>                    
            </section>                
  
            <section class="top_card">
              
              <div class="name_number">
                <h1>${pokemon.name}</h1>
                  <h3>#${poke_num_pad}</h3>
              </div>
                  
              <div class="tags">
                  ${pokemon.types.map((type) => `<h5 class="${type}" style="border-radius: 1rem;">${type}</h5>`).join("")}
              </div>
            </section>                
  
              <section class="poke_image">
                    <div class="photo"><img src="${pokemon.photo}" alt="${pokemon.name}"></div>
              </section>
        </div>
                  
        <div class="card_body">
          
        <div class="tab">
            <button class="tablinks" onclick="openCity(event, 'about')">Sobre</button>
            <button class="tablinks" onclick="openCity(event, 'base')">Base Stats</button>
          </div>
          
            <div id="about" class="tabcontent">
              <ol class="ol_about"><p>Altura</p><li>${pokemon.height} m</li></ol>
              <ol class="ol_about"><p>Peso</p><li>${pokemon.weight} Kg</li></ol>
              <ol class="ol_about"><p>Habilidades</p>${pokemon.abilities.map((ability) => `<li>${ability}</li>`)
              .join("")}
              </ol>                    
            </div>
                  
          <div id="base" class="tabcontent" style="display: none;">                             
            <ol class="ol_tg">
                  <p>HP</p>
                  <li>
                    <div>
                        <span class="bar_stats">${pokemon.hp}</span>
                        <progress class="hp" value="${pokemon.hp}" max="220"></progress>
                      </div>
                  </li>
                </ol>
  
                <ol class="ol_tg">
                  <p>Attack</p>
                    <li>
                      <div>
                        <span class="bar_stats">${pokemon.atk}</span>
                        <progress value="${pokemon.atk}" max="220"></progress>
                      </div>
                    </li>
                </ol>
  
                  <ol class="ol_tg">
                  <p>Defense</p>
                    <li>
                      <div>
                        <span class="bar_stats">${pokemon.def}</span>
                        <progress value="${pokemon.def}" max="220"></progress>
                      </div>
                    </li>
                  </ol>
  
                  <ol class="ol_tg">
                  <p>Sp. Atk</p>
                    <li>
                      <div>
                        <span class="bar_stats">${pokemon.sp_atk}</span>
                        <progress value="${pokemon.sp_atk}" max="220"></progress>
                      </div>
                    </li>
                  </ol>
  
                  <ol class="ol_tg">
                  <p>Sp. Def</p>
                    <li>
                      <div>
                      <span class="bar_stats">${pokemon.sp_def}</span>
                      <progress value="${pokemon.sp_def}" max="220"></progress>
                    </div>
                    </li>
                  </ol>
  
                  <ol class="ol_tg">
                  <p>Speed</p>
                    <li>
                      <div>
                      <span class="bar_stats">${pokemon.speed}</span>
                        <progress value="${pokemon.speed}" max="220"></progress>
                    </div>
                    </li>
                  </ol>
                </div>
          </div>
        </div>
        
        <section class="icons">
                  <div class="left_arrow">
                    <a href="detail.html?id=${num_anterior}"><span>&#8592 #${num_anterior_pad}</span></a>
                  </div>                    

                <div class="right_arrow">
                  <a href="detail.html?id=${proximo_num}"><span>#${proximo_num_pad} &#8594;</span></a>
                </div>                    
              </section> 
          
          `;
          detailsContainer.appendChild(detalhes);
  }
  
  exibirDetalhesPokemon();
