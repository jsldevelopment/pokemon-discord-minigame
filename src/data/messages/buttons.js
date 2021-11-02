const { Button } = require('../../objects/Button.js');
const { MessageActionRow } = require('discord.js');

const buttons = {

    btnSample: new Button({
        id: 'sampleButton',
        label: 'Sample'
    }),
}

const buttonRows = {

    rowSample: new MessageActionRow().addComponents( buttons.btnSample.button )
    
}

exports.buttons = buttonRows;