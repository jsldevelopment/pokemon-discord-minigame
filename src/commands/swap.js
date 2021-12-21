module.exports = {
    data: {
        "name": "swap",
        "type": 1,
        "description": "Swap pokemon between your box and party.",
        "options": [{
                "name": "team",
                "description": "Move which Pokemon to box?",
                "type": 4,
                "required": true,
                "choices": [{
                    "name": "1",
                    "value": 1
                }, {
                    "name": "2",
                    "value": 2
                }, {
                    "name": "3",
                    "value": 3
                }]
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