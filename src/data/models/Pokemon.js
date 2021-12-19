const Type = require('./enum/Type');
const Ability = require('./Ability');
const Pokedex = require('./Pokedex');
const Move = require('./Move');


module.exports = {
    // Totodile
    158: {
        id: 158,
        dex: Pokedex[158],
        types: [
            Type.Water
        ],
        stats: {
            base: {
                hp: 50,
                atk: 65,
                def: 64,
                spatk: 44,
                spdef: 48,
                spd: 43
            }
        },
        moveSet: [
            Move.WaterGun,
            Move.Bite,
            Move.ScaryFace,
            Move.Scratch
        ],
        abilities: Ability.Torrent
    },
    // Sentret
    161: {
        id: 161,
        dex: Pokedex[161],
        types: [
            Type.Normal
        ],
        stats: {
            base: {
                hp: 40,
                atk: 55,
                def: 30,
                spatk: 30,
                spdef: 30,
                spd: 60
            }
        },
        moveSet: [
            Move.Scratch,
            Move.DefenseCurl,
            Move.Charm,
            Move.SuckerPunch
        ],
        abilities: Ability.Frisk
    },
    // Chimchar
    390: {
        id: 390,
        dex: Pokedex[390],
        types: [
            Type.Fire
        ],
        stats: {
            base: {
                hp: 45,
                atk: 49,
                def: 49,
                spatk: 65,
                spdef: 65,
                spd: 45
            }
        },
        moveSet: [
            Move.Scratch,
            Move.Leer,
            Move.Ember,
            Move.LowKick
        ],
        abilities: Ability.Blaze
    },
    // Starly
    396: {
        id: 396,
        dex: Pokedex[396],
        types: [
            Type.Normal,
            Type.Flying
        ],
        stats: {
            base: {
                hp: 40,
                atk: 55,
                def: 30,
                spatk: 30,
                spdef: 30,
                spd: 60
            }
        },
        moveSet: [
            Move.QuickAttack,
            Move.Growl,
            Move.WingAttack,
            Move.DoubleTeam
        ],
        abilities: Ability.KeenEye
    },
    // Snivy
    495: {
        id: 495,
        dex: Pokedex[495],
        types: [
            Type.Grass
        ],
        stats: {
            base: {
                hp: 45,
                atk: 49,
                def: 49,
                spatk: 65,
                spdef: 65,
                spd: 45
            }
        },
        moveSet: [
            Move.VineWhip,
            Move.Tackle,
            Move.Growl,
            Move.Absorb
        ],
        abilities: Ability.Overgrow
    }
}