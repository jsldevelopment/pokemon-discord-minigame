const uuid = require('uuid').v4;
module.exports = async function(rawPokemon) {

    const newPokemon = {};
    // every generated pokemon recieves a uuid
    newPokemon.uuid = uuid();
    // values taken directly from raw
    newPokemon.id = rawPokemon.id;
    newPokemon.name = rawPokemon.name;
    newPokemon.types = rawPokemon.types;
    // values generated based on raw
    newPokemon.gender = Math.floor(Math.random() * 101) < rawPokemon.genderRatio ? 1 : 0;
    newPokemon.ability =  Math.floor(Math.random() * 101) < rawPokemon.abilities.abilityRatio ? rawPokemon.abilities.ability1 : rawPokemon.abilities.ability2;
    return newPokemon;

}