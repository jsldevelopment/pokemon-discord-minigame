const { MessageActionRow, MessageButton } = require('discord.js');

const btnStarter1 = {
    button: new MessageButton()
        .setCustomId('btnStarter1')
        .setStyle('PRIMARY')
        .setEmoji({
            "id": "899008800806273164",
        }),
    async execute(interaction, options) {
        await interaction.reply(options);
    }
}

const btnStarter2 = {
    button: new MessageButton()
        .setCustomId('btnStarter2')
        .setStyle('PRIMARY')
        .setEmoji({
            "id": "899008800785317998",
        }),
    async execute(interaction, options) {
        await interaction.reply(options);
    }
}


const btnStarter3 = {
    button: new MessageButton()
        .setCustomId('btnStarter3')
        .setStyle('PRIMARY')
        .setEmoji({
            "id": "899008800831442944",
        }),
    async execute(interaction, options) {
        await interaction.reply(options);
    }
}

var rowSelectStarter = new MessageActionRow()
    .addComponents( btnStarter1.button, btnStarter2.button, btnStarter3.button );

exports.rowSelectStarter = {
	data: {
        name: 'rowSelectStarter',
        buttons: rowSelectStarter
    },
    buttons: {
        btnStarter1: btnStarter1,
        btnStarter2: btnStarter2,
        btnStarter3: btnStarter3
    }
}