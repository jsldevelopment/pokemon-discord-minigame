const { MessageActionRow } = require('discord.js');
const buttonMap = require('./buttons.js');

var rowBeginRegistration = new MessageActionRow()
.addComponents( buttonMap.btnBeginRegistration.button );

var rowConfirmReg = new MessageActionRow()
.addComponents( buttonMap.btnConfirmReg.button );

var rowConfirmRules = new MessageActionRow()
.addComponents( buttonMap.btnRules.button );

var rowSelectStarter = new MessageActionRow()
.addComponents( buttonMap.btnStarter1.button, buttonMap.btnStarter2.button, buttonMap.btnStarter3.button );

var rowSelectAvatar = new MessageActionRow()
.addComponents( buttonMap.btnAvatar1.button, buttonMap.btnAvatar2.button );


/**
 * export all rows
 */
exports.buttonRows = {
    rowBeginRegistration: {
        data: {
            name: 'rowBeginRegistration',
            buttons: rowBeginRegistration
        },
        buttons: {
            btnBeginRegistration: buttonMap.btnBeginRegistration
        }
    },
    rowSelectAvatar: {
        data: {
            name: 'rowSelectAvatar',
            buttons: rowSelectAvatar
        },
        buttons: {
            btnAvatar1: buttonMap.btnAvatar2,
            btnAvatar2: buttonMap.btnAvatar2
        }
    },
    rowSelectStarter: {
        data: {
            name: 'rowSelectStarter',
            buttons: rowSelectStarter
        },
        buttons: {
            btnStarter1: buttonMap.btnStarter1,
            btnStarter2: buttonMap.btnStarter2,
            btnStarter3: buttonMap.btnStarter3
        }
    },
    rowConfirmRules: {
        data: {
            name: 'rowConfirmRules',
            buttons: rowConfirmRules
        },
        buttons: {
            btnRules: buttonMap.btnRules
        }
    },
    rowConfirmReg: {
        data: {
            name: 'rowConfirmReg',
            buttons: rowConfirmReg
        },
        buttons: {
            btnConfirmReg: buttonMap.btnConfirmReg
        }
    }
}

exports.buttonMap = buttonMap;