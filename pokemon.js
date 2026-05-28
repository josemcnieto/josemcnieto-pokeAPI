const input = document.getElementById("poke-input");
const btn = document.getElementById("btn-buscar");
const out = document.getElementById("resultado");
const btnSonido = document.getElementById("btn-sonido");

let sonidoPokemon = null;

btn.addEventListener("click", async () => {

    const termino = input.value.trim().toLowerCase();

    if (termino === "") {
        out.textContent = "⚠ Escribe un Pokémon";
        return;
    }

    out.textContent = "⌛ Cargando...";

    const pokemon = await respuesta.json();

// sonido
sonidoPokemon = new Audio(pokemon.cries.latest);

// tipos
const tipos = pokemon.types
    .map(t => t.type.name)
    .join(", ");

// estadísticas
const estadisticasHTML = pokemon.stats
    .map(stat => `
        <li>
            <strong>${stat.stat.name.toUpperCase()}</strong>:
            ${stat.base_stat}
        </li>
    `)
    .join("");

// pintar HTML
out.innerHTML = `
    <h2>${pokemon.name.toUpperCase()} (#${pokemon.id})</h2>

    <img
        src="${pokemon.sprites.front_default}"
        alt="${pokemon.name}"
        width="150"
    >

    <p><strong>Tipos:</strong> ${tipos}</p>

    <h3>Estadísticas</h3>

    <ul>
        ${estadisticasHTML}
    </ul>
`;
    } catch (error) {

        out.textContent = "❌ Pokémon no encontrado";
    }
});

// botón sonido
btnSonido.addEventListener("click", () => {

    if (sonidoPokemon) {

        sonidoPokemon.play();

    } else {

        alert("Busca un Pokémon primero");
    }
});
