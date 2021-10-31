module.exports = (stat, nature, iv, level, ev, isHp = false) => {
        
    console.log(`${stat} + ${nature} + ${iv} + ${level}`)
    // hp is different the other stats
    let newStat = 0;

    if(isHp) {
        newStat = Math.floor(((2 * stat + iv + Math.floor(ev/4)) * level) / 100) + level + 10;
    } else { 
        newStat = Math.floor(((2 * stat + iv + Math.floor(ev/4)) * level) / 100) + 5;
    }

    // check for natures
    // hardy, docile, serious, bashful, and quirky do not affect stats in any way
    console.log(natureTable[nature]);

    if(natureTable[nature]) {
        // natures arent being calc'd
        if (stat === natureTable[nature].boost) {
            newStat = Math.floor(newStat + (newStat * .10));            
        }
        if (stat === natureTable[nature].lower) {
            newStat = Math.floor(newStat - (newStat * .10));            
        }
    }

    return newStat;

}

const natureTable = {
    "lonely": {
        boost: "atk",
        lower: "def"
    },
    "brave": {
        boost: "atk",
        lower: "spd"
    }
}
