const { Button } = require('../objects/Button.js');
const { MessageActionRow } = require('discord.js');

const buttons = {

    btnBeginRegistration: new Button({
        id: 'beginRegistration',
        label: 'Begin'
    }),
    btnSelectAvatar1: new Button({
        id: 'selectAvatar1',
        label: 'Avatar 1'
    }),
    btnSelectAvatar2: new Button({
        id: 'selectAvatar2',
        label: 'Avatar 2'
    }),
    btnSelectStarter1: new Button({
        id: 'selectStarter1',
        label: 'Starter 1'
    }),
    btnSelectStarter2: new Button({
        id: 'selectStarter2',
        label: 'Starter 2'
    }),
    btnSelectStarter3: new Button({
        id: 'selectStarter3',
        label: 'Starter 3'
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