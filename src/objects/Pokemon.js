class Pokemon {

    constructor(uuid, captured, id, types, level, evolves, base, gender, ability, nature, ivs, evs, moves, learned, stats) {
        /**
         * @type UUID
         */
        this.uuid = uuid;

        /**
         * @type Date
         */
        this.captured = captured;
        this.id = id;
        this.types = types;
        this.level = level; 
        this.evolves = evolves;
        this.base = base;
        this.gender = gender;
        this.ability = ability;
        this.nature = nature;
        this.ivs = ivs;
        this.evs = evs;
        this.moves = moves;
        this.learned = learned;
        this.stats = stats;
    }

}

module.exports = Pokemon;