const { MessageActionRow, MessageButton } = require('discord.js');

const btnRules = {
    button: new MessageButton()
        .setCustomId('btnRules')
        .setStyle('PRIMARY')
        .setEmoji({
            "id": "899008800806273164",
        }),
    async execute(interaction, options) {
        await interaction.reply({
            content: "You have selected the following settings: " + JSON.stringify(options.user),
            components: options.components
        });
    }
}

var rowConfirmRules = new MessageActionRow()
    .addComponents( btnRules.button );

exports.rowConfirmRules = {
	data: {
        name: 'rowConfirmRules',
        buttons: rowConfirmRules
    },
    buttons: {
        btnRules: btnRules
    }
}