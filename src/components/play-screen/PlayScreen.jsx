import { useState, useEffect } from 'react';
import PokemonCard from './PokemonCard';
import Restart from '../restart/Restart';
import { v4 as uuid } from 'uuid';

export default function PlayScreen({ region, onReturn }) {
  const NUMBER_OF_POKEMONS = 18;
  const [pokemons, setPokemons] = useState([]);
  const [restartCount, setRestartCount] = useState(0);
  const [chosenPokemons, setChosenPokemons] = useState([]);
  const [bestScore, setBestScore] = useState(0);
  const [restartVisibility, setRestartVisibility] = useState(false);
  const [loading, setLoading] = useState(true);

  function onCardClick(id) {
    if (chosenPokemons.includes(id)) {
      setRestartVisibility(true);
    } else {
      setChosenPokemons([...chosenPokemons, id]);
      setBestScore((prevBestScore) =>
        prevBestScore < chosenPokemons.length + 1
          ? chosenPokemons.length + 1
          : prevBestScore
      );
    }
  }

  function onRestart() {
    setChosenPokemons([]);
    setRestartVisibility(false);
    setRestartCount(restartCount + 1);
  }

  useEffect(() => {
    (async function getPokemons() {
      setLoading(true);
      const pokedexes = await fetch(
        `https://pokeapi.co/api/v2/region/${region}`,
        { mode: 'cors' }
      )
        .then((response) => response.json())
        .then((json) => json.pokedexes);
      const pokedexUrls = pokedexes.map((pokedex) => pokedex.url);
      const pokemonUrlsByPokedex = await Promise.all(
        pokedexUrls.map((url) =>
          fetch(url, { mode: 'cors' })
            .then((response) => response.json())
            .then((json) =>
              json.pokemon_entries.map((entry) =>
                entry.pokemon_species.url.replace('-species', '')
              )
            )
        )
      );
      const mergedURLs = pokemonUrlsByPokedex.reduce(
        (prev, pokedex) => [...prev, ...pokedex],
        []
      );
      const randomURLs = mergedURLs
        .toSorted(() => 0.5 - Math.random())
        .slice(0, NUMBER_OF_POKEMONS);
      const randomPokemons = await Promise.all(
        randomURLs.map((url) =>
          fetch(url, {
            mode: 'cors',
          }).then((response) => response.json())
        )
      );
      setPokemons(
        randomPokemons.map((pokemon) => {
          return {
            id: uuid(),
            name: pokemon.name,
            sprite_url: pokemon.sprites.front_default,
          };
        })
      );
      setLoading(false);
    })();
  }, [region, restartCount]);

  return (
    <div className="play-screen">
      {loading ? (
        <div className='loading'>Loading...</div>
      ) : (
        <>
          <div className="header-row">
            <button className='return' type="button" onClick={onReturn}>Menu</button>
            <div className="score-container">
              <div>
                Score: <span>{chosenPokemons.length}</span>
              </div>
              <div>
                Best score: <span>{bestScore}</span>
              </div>
            </div>
          </div>
          <div className="pokemon-card-container">
            {pokemons
              .toSorted(() => 0.5 - Math.random())
              .map((pokemon) => (
                <PokemonCard
                  {...pokemon}
                  key={pokemon.id}
                  onCardClick={onCardClick}
                ></PokemonCard>
              ))}
          </div>
        </>
      )}

      {restartVisibility ? (
        <Restart
          score={chosenPokemons.length}
          bestScore={bestScore}
          onRestart={onRestart}
          onCancel={onReturn}
        ></Restart>
      ) : null}
    </div>
  );
}
