/* eslint-disable import/prefer-default-export */
import axios from 'axios';

export const PokeApi = async () =>{ 
    const resJson = await axios
    .get(`https://pokeapi.co/api/v2/pokemon?limit=807`)
    
    .then(function (response) {
        console.log("get avanzo")
      const { data } = response;
      const { results } = data;
      const newPokemonData = {};
      results.forEach((pokemon, index) => {
        newPokemonData[index + 1] = {
          id: index + 1,
          name: pokemon.name,
          sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
            index + 1
          }.png`,
        };
      });
      return newPokemonData;
    });
    return resJson
}
