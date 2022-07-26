async function getPokemons() {
    const respons = await fetch(
        'https://pokeapi.co/api/v2/pokemon/?offset=${pages}&limit=898',
    );
    const dataJson = await respons.json();

    dataJson.results.forEach(async function (index) {
        const pokeRespons = await fetch(index.url);
        const pokeData = await pokeRespons.json();

        const descriptionPoke = await fetch(pokeData.species.url);
        const descriptionJson = await descriptionPoke.json();

        let text = '';

        for (let i = 0; i <= 200; i++) {
            if (descriptionJson.flavor_text_entries[i].language.name === 'en') {
                text = descriptionJson.flavor_text_entries[
                    i
                ].flavor_text.replace('', '');
                break;
            }
        }

        const types1 = pokeData.types[0].type.name;
        let types2 = '';
        try {
            types2 = pokeData.types[1].type.name;
        } catch (a) {
            types2 = '';
        }

        document.querySelector('#listaPokes').insertAdjacentHTML(
            'beforeend',
            `
    <div class="cardPoke">
        <div>
         <img class="pokeImage" src="${pokeData.sprites.other['official-artwork'].front_default} ">
         </div>
    
        <div>

        <h2 class="pokeName">${pokeData.name} </h2>
        <h4 class="pokeNumber">N°: ${pokeData.id} </h4>
        <div>
        <h4 class="pokeType">${types1}</h4>
        <h4 class="pokeType">${types2}</h4>
        </div>
        <h4 class="descriptionTitle">Description</h4>
        <p class="descriptionText">${text} </p>
        </div>
    </div>
`,
        );
    });
}

getPokemons();
