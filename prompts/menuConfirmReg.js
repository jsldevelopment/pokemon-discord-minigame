const { MessageActionRow, MessageButton } = require('discord.js');

const btnConfirmReg = {
    button: new MessageButton()
        .setCustomId('btnRules')
        .setStyle('PRIMARY')
        .setLabel('Confirm'),
    async execute(interaction, options) {
        await interaction.reply(options);
    }
}

var rowConfirmReg = new MessageActionRow()
    .addComponents( btnConfirmReg.button );

exports.rowConfirmReg = {
	data: {
        name: 'rowConfirmReg',
        buttons: rowConfirmReg
    },
    buttons: {
        btnConfirmReg: btnConfirmReg
    }
}