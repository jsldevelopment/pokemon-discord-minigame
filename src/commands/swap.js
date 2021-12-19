module.exports = {
    data: {
        "name": "swap",
        "type": 1,
        "description": "Swap pokemon between your box and party.",
        "options": [{
                "name": "team",
                "description": "Move which Pokemon to box?",
                "type": 3,
                "required": true
            },
            {
                "name": "box",
                "description": "Swap with which box Pokemon?",
                "type": 3,
                "required": true
            }
        ]
    }
}