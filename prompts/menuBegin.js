const { MessageActionRow, MessageButton } = require('discord.js');

var rowBeginRegistration;

const btnBeginRegistration = {
    button: new MessageButton()
        .setStyle('PRIMARY')
        .setCustomId('btnBeginRegistration')
        .setLabel('Begin'),
    
    async execute(interaction, options) {
        await interaction.reply(options);
    }
}


rowBeginRegistration = new MessageActionRow()
    .addComponents( btnBeginRegistration.button );

exports.rowBeginRegistration = {
	data: {
        name: 'rowBeginRegistration',
        buttons: rowBeginRegistration
    },
    buttons: {
        btnBeginRegistration: btnBeginRegistration
    }
}