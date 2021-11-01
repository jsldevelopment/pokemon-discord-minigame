const uuid = require('uuid').v4;
const rawPokemon = require('../data/models/pokemon-raw.js');

module.exports = async function(id, level) {

    let raw = rawPokemon[id];

    // declare empty new pokemon
    const newPokemon = {};
    // every generated pokemon recieves a uuid
    newPokemon.uuid = uuid();
    newPokemon.captured = Date.now();
    // values taken directly from raw
    newPokemon.id = raw.id;
    newPokemon.name = raw.name;
    newPokemon.types = raw.types;
    newPokemon.level = level;
    newPokemon.evolves = raw.evolves;
    // get base stats
    newPokemon.base = raw.base;
    // values generated based on raw
    newPokemon.gender = Math.floor(Math.random() * 101) < raw.genderRatio ? 1 : 0;
    newPokemon.ability =  Math.floor(Math.random() * 101) < raw.abilities.abilityRatio ? raw.abilities.ability1 : raw.abilities.ability2;
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
    newPokemon.moves = raw.moves;
    newPokemon.learned = raw.learned;
    
    return newPokemon;

}

const natures = [
    "lonely"
];