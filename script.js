// Seção 1: Lista de Pokémon
document.getElementById('carregar-lista').addEventListener('click', function() {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=10')
        .then(response => response.json())
        .then(data => {
            const promises = data.results.map(pokemon => fetch(pokemon.url).then(res => res.json()));
            return Promise.all(promises);
        })
        .then(pokemons => {
            const lista = document.getElementById('resultado-lista');
            lista.innerHTML = '';
            pokemons.forEach(pokemon => {
                const div = document.createElement('div');
                div.className = 'pokemon-item';
                div.innerHTML = `
                    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
                    <p>${pokemon.name}</p>
                `;
                lista.appendChild(div);
            });
        })
        .catch(error => console.error('Erro ao carregar lista:', error));
});

// Seção 2: Pokémon Aleatório
document.getElementById('carregar-aleatorio').addEventListener('click', function() {
    const randomId = Math.floor(Math.random() * 1010) + 1;
    fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`)
        .then(response => response.json())
        .then(data => {
            const resultado = document.getElementById('resultado-aleatorio');
            resultado.innerHTML = `
                <h3>${data.name}</h3>
                <img src="${data.sprites.front_default}" alt="${data.name}">
                <p>Altura: ${data.height}</p>
                <p>Peso: ${data.weight}</p>
            `;
        })
        .catch(error => console.error('Erro ao carregar Pokémon aleatório:', error));
});

// Seção 3: Pokémon por Tipo
document.getElementById('carregar-por-tipo').addEventListener('click', function() {
    const tipo = document.getElementById('tipo-select').value;
    if (!tipo) {
        alert('Selecione um tipo!');
        return;
    }
    fetch(`https://pokeapi.co/api/v2/type/${tipo}`)
        .then(response => response.json())
        .then(data => {
            const promises = data.pokemon.slice(0, 10).map(entry => fetch(entry.pokemon.url).then(res => res.json()));
            return Promise.all(promises);
        })
        .then(pokemons => {
            const resultado = document.getElementById('resultado-tipo');
            resultado.innerHTML = '';
            pokemons.forEach(pokemon => {
                const div = document.createElement('div');
                div.className = 'pokemon-item';
                div.innerHTML = `
                    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
                    <p>${pokemon.name}</p>
                `;
                resultado.appendChild(div);
            });
        })
        .catch(error => console.error('Erro ao carregar Pokémon por tipo:', error));
});