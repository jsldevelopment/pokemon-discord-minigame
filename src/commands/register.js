const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: {
        "name": "register",
        "type": 1,
        "description": "Register to play Pokemon Lite!",
        "options": [{
            "name": "starter",
            "description": "Which starter do you want to play with?",
            "type": 4,
            "required": true,
            "choices": [{
                "name": "Snivy",
                "value": 495
            }, {
                "name": "Chimchar",
                "value": 390
            }, {
                "name": "Totodile",
                "value": 158
            }]
        }]
    }
}