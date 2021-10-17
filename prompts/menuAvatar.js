const { MessageActionRow, MessageButton } = require('discord.js');

const btnAvatar1 = {
    button: new MessageButton()
        .setCustomId('btnAvatar1')
        .setStyle('PRIMARY')
        .setEmoji({
            "id": "898633695748046848",
        }),
    async execute(interaction, options) {
        await interaction.reply(options);
    }
}

const btnAvatar2 = {
    button: new MessageButton()
        .setCustomId('btnAvatar2')
        .setStyle('PRIMARY')
        .setEmoji({
            "id": "898633695605444658",
        }),
    async execute(interaction, options) {
        await interaction.reply(options);
    }
}

var rowSelectAvatar = new MessageActionRow()
    .addComponents( btnAvatar1.button, btnAvatar2.button );

exports.rowSelectAvatar = {
	data: {
        name: 'rowSelectAvatar',
        buttons: rowSelectAvatar
    },
    buttons: {
        btnAvatar1: btnAvatar2,
        btnAvatar2: btnAvatar2
    }
}