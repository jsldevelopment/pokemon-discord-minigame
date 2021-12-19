const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: {
        "name": "expedition",
        "type": 1,
        "description": "Go on an expedition to find wild Pokemon!",
        "options": [{
            "name": "area",
            "description": "Where do you want to explore?",
            "type": 3,
            "required": true,
            "choices": [{
                "name": "Route 1",
                "value": "route1"
            }]
        }]
    }
}