/*
    moves reference:
        type = the type of the move, i.e. fighting, fire
        cat = the category of move - 
            0 = phys
            1 = special
            2 = status
        dmg = the amt of dmg done, based on cat
        acc = the % chance of the move hitting
        pp = how many times in 1 battle the move can be used
*/
module.exports = {
    "tackle": {
        type: 'normal',
        cat: 0,
        dmg: 40,
        acc: 100,
        pp: 35
    },
    "growl": {
        type: normal,
        cat: 2,
        dmg: 0,
        acc: 100,
        pp: 40
    }
}