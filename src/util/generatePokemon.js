const uuid = require('uuid').v4;
module.exports = async function(rawPokemon, level) {

    // declare empty new pokemon
    const newPokemon = {};
    // every generated pokemon recieves a uuid
    newPokemon.uuid = uuid();
    newPokemon.captured = Date.now();
    // values taken directly from raw
    newPokemon.id = rawPokemon.id;
    newPokemon.name = rawPokemon.name;
    newPokemon.types = rawPokemon.types;
    newPokemon.level = level;
    newPokemon.evolves = rawPokemon.evolves;
    // get base stats
    newPokemon.base = rawPokemon.base;
    // values generated based on raw
    newPokemon.gender = Math.floor(Math.random() * 101) < rawPokemon.genderRatio ? 1 : 0;
    newPokemon.ability =  Math.floor(Math.random() * 101) < rawPokemon.abilities.abilityRatio ? rawPokemon.abilities.ability1 : rawPokemon.abilities.ability2;
    // get nature from table
    newPokemon.nature = natures[Math.floor(Math.random() * natures.length)];
    // randomize IVs
    newPokemon.ivs = {
        "hp": Math.floor(Math.random() * 32),
        "atk": Math.floor(Math.random() * 32),
        "def": Math.floor(Math.random() * 32),
        "spatk": Math.floor(Math.random() * 32),
        "spdef": Math.floor(Math.random() * 32),
        "spd": Math.floor(Math.random() * 32)
    },
    newPokemon.evs = {
        "hp": 0,
        "atk": 0,
        "def": 0,
        "spatk": 0,
        "spdef": 0,
        "spd": 0
    },
    newPokemon.stats = {};
    // get starting moves
    newPokemon.moves = rawPokemon.moves;
    newPokemon.learned = rawPokemon.learned;
    
    return newPokemon;

}

const natures = [
    "lonely"
];