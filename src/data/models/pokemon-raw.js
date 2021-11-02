const { Types } = require('../../util/constants');

module.exports = {
    "1": {
        "id": 1,
        "name": "Bulbasaur",
        "types": [Types.grass, Types.poison],
        "genderRatio": 88,
        "abilities": {
            "ability1": {
                "name": "overgrow"
            },
            "abilityRatio": 100,
            "abilitySecret": "chlorophyll" 
        },
        "evolves": 16,
        "base": {
            hp: 45,
            "atk": 49,
            "def": 49,
            "spatk": 65,
            "spdef": 65,
            "spd": 45
        },
        "moves": {
            1: "tackle",
            2: "growl",
            3: null,
            4: null
        },
        "learned": {}
    },
    "10": {
        "id": 10,
        "name": "Caterpie",
        "types": [Types.bug],
        "genderRatio": 30,
        "abilities": {
            "ability1": {
                "name": "shield dust"
            },
            "abilityRatio": 100,
            "abilitySecret": "run away" 
        },
        "evolves": 7,
        "base": {
            "hp": 45,
            "atk": 30,
            "def": 35,
            "spatk": 20,
            "spdef": 20,
            "spd": 45
        },
        "moves": {
            1: "tackle",
            2: "string shot",
            3: null,
            4: null
        },
        "learned": {},
        "evYield": {
            "stat": "hp",
            "amt": 1
        },
        "expRate": "mediumFast",
        "catchRate": 255
    },
    "11": {
        "id": 11,
        "name": "Metapod",
        "types": ["bug"],
        "genderRatio": 50,
        "abilities": {
            "ability1": {
                "name": "shed skin"
            },
            "abilityRatio": 100,
            "abilitySecret": null
        },
        "evolves": 10,
        "base": {
            "hp": 50,
            "atk": 20,
            "def": 55,
            "spatk": 25,
            "spdef": 25,
            "spd": 30
        },
        "moves": {
            "learned": {
                1: "tackle",
                2: "harden",
                3: null,
                4: null
            },
            "byLevel": {}
        },
        "evYield": {
            "stat": "def",
            "amt": 2
        },
        "expRate": "mediumFast",
        "catchRate": 120
    },
    "13": {
        "id": 10,
        "name": "Weedle",
        "types": ["bug"],
        "genderRatio": 30,
        "abilities": {
            "ability1": {
                "name": "shield dust"
            },
            "abilityRatio": 100,
            "abilitySecret": "run away" 
        },
        "evolves": 7,
        "base": {
            "hp": 45,
            "atk": 30,
            "def": 35,
            "spatk": 20,
            "spdef": 20,
            "spd": 45
        },
        "moves": {
            1: "tackle",
            2: "string shot",
            3: null,
            4: null
        },
        "learned": {},
        "evYield": {
            "stat": "hp",
            "amt": 1
        },
        "expRate": "mediumFast",
        "catchRate": 255
    },
    "14": {
        "id": 10,
        "name": "Kakuna",
        "types": ["bug"],
        "genderRatio": 30,
        "abilities": {
            "ability1": {
                "name": "shield dust"
            },
            "abilityRatio": 100,
            "abilitySecret": "run away" 
        },
        "evolves": 7,
        "base": {
            "hp": 45,
            "atk": 30,
            "def": 35,
            "spatk": 20,
            "spdef": 20,
            "spd": 45
        },
        "moves": {
            1: "tackle",
            2: "string shot",
            3: null,
            4: null
        },
        "learned": {},
        "evYield": {
            "stat": "hp",
            "amt": 1
        },
        "expRate": "mediumFast",
        "catchRate": 255
    },
    "127": {
        "id": 10,
        "name": "Pinsir",
        "types": ["bug"],
        "genderRatio": 30,
        "abilities": {
            "ability1": {
                "name": "shield dust"
            },
            "abilityRatio": 100,
            "abilitySecret": "run away" 
        },
        "evolves": 7,
        "base": {
            "hp": 45,
            "atk": 30,
            "def": 35,
            "spatk": 20,
            "spdef": 20,
            "spd": 45
        },
        "moves": {
            1: "tackle",
            2: "string shot",
            3: null,
            4: null
        },
        "learned": {},
        "evYield": {
            "stat": "hp",
            "amt": 1
        },
        "expRate": "mediumFast",
        "catchRate": 255
    },
    "167": {
        "id": 10,
        "name": "Spinarak",
        "types": ["bug"],
        "genderRatio": 30,
        "abilities": {
            "ability1": {
                "name": "shield dust"
            },
            "abilityRatio": 100,
            "abilitySecret": "run away" 
        },
        "evolves": 7,
        "base": {
            "hp": 45,
            "atk": 30,
            "def": 35,
            "spatk": 20,
            "spdef": 20,
            "spd": 45
        },
        "moves": {
            1: "tackle",
            2: "string shot",
            3: null,
            4: null
        },
        "learned": {},
        "evYield": {
            "stat": "hp",
            "amt": 1
        },
        "expRate": "mediumFast",
        "catchRate": 255
    }
}