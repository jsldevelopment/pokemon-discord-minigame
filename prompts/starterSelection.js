const { MessageActionRow, MessageButton } = require('discord.js');
const { thirdPrompt } = require ('./registerUserText.js');
const { rulesAgreementRow } = require ('./rulesSelection.js');

const starter1 = {
    button: new MessageButton()
        .setCustomId('starter1')
        .setStyle('PRIMARY')
        .setEmoji({
            "id": "899008800806273164",
        }),
    async execute(interaction) {
        await interaction.reply({content: thirdPrompt, components: [rulesAgreementRow.data.buttons]});
    }
}

const starter2 = {
    button: new MessageButton()
        .setCustomId('starter2')
        .setStyle('PRIMARY')
        .setEmoji({
            "id": "899008800785317998",
        }),
    async execute(interaction) {
        console.log('test');
        await interaction.reply({content: thirdPrompt, components: [rulesAgreementRow.data.buttons]});
    }
}


const starter3 = {
    button: new MessageButton()
        .setCustomId('starter3')
        .setStyle('PRIMARY')
        .setEmoji({
            "id": "899008800831442944",
        }),
    async execute(interaction) {
        await interaction.reply({content: thirdPrompt, components: [rulesAgreementRow.data.buttons]});
    }
}

var starterSelectionRow = new MessageActionRow()
    .addComponents( starter1.button, starter2.button, starter3.button );

exports.starterSelectionRow = {
	data: {
        name: 'starterSelectionRow',
        buttons: starterSelectionRow
    }
}

exports.starter1 = starter1;
exports.starter2 = starter2;
exports.starter3 = starter3;