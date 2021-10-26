const { Button } = require('../objects/Button.js');
const { MessageActionRow } = require('discord.js');

const buttons = {

    btnBeginRegistration: new Button({
        id: 'beginRegistration',
        label: 'Begin'
    }),
    btnSelectAvatar1: new Button({
        id: 'selectAvatar1',
        label: 'May'
    }),
    btnSelectAvatar2: new Button({
        id: 'selectAvatar2',
        label: 'Brendan'
    }),
    btnSelectAvatar3: new Button({
        id: 'selectAvatar3',
        label: 'Aqua'
    }),
    btnSelectAvatar4: new Button({
        id: 'selectAvatar4',
        label: 'Magma'
    }),
    btnSelectAvatar5: new Button({
        id: 'selectAvatar5',
        label: 'Fighter'
    }),
    btnSelectAvatar6: new Button({
        id: 'selectAvatar6',
        label: 'Beauty'
    }),
    btnSelectAvatar7: new Button({
        id: 'selectAvatar7',
        label: 'Scientist'
    }),
    btnSelectAvatar8: new Button({
        id: 'selectAvatar8',
        label: 'Fisher'
    }),
    btnSelectAvatar9: new Button({
        id: 'selectAvatar9',
        label: 'Elder'
    }),
    btnSelectStarter1: new Button({
        id: 'selectStarter1',
        label: 'Bulbasaur'
    }),
    btnSelectStarter2: new Button({
        id: 'selectStarter4',
        label: 'Charmander'
    }),
    btnSelectStarter3: new Button({
        id: 'selectStarter7',
        label: 'Squirtle'
    }),
    btnConfirmRegistration: new Button({
        id: 'confirmRegistration',
        label: 'Confirm'
    })

}

const buttonRows = {

    rowRegister:            new MessageActionRow().addComponents( buttons.btnBeginRegistration.button ),
    rowSelectAvatar:        new MessageActionRow().addComponents( buttons.btnSelectAvatar1.button, buttons.btnSelectAvatar2.button ),
    rowSelectStarter:       new MessageActionRow().addComponents( buttons.btnSelectStarter1.button, buttons.btnSelectStarter2.button, buttons.btnSelectStarter3.button ),
    rowConfirmRegistration: new MessageActionRow().addComponents( buttons.btnConfirmRegistration.button )
    
}

exports.buttons = buttonRows;