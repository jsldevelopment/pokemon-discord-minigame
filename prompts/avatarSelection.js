const { MessageActionRow, MessageButton } = require('discord.js');
const { secondPrompt } = require ('./registerUserText.js');
const { starterSelectionRow } = require ('./starterSelection.js');

const maleav1 = {
    button: new MessageButton()
        .setCustomId('maleav1')
        .setStyle('PRIMARY')
        .setEmoji({
            "id": "898633695748046848",
        }),
    async execute(interaction) {
        await interaction.reply({content: secondPrompt, components: [starterSelectionRow.data.buttons]});
    }
}

const femaleav1 = {
    button: new MessageButton()
        .setCustomId('femaleav1')
        .setStyle('PRIMARY')
        .setEmoji({
            "id": "898633695605444658",
        }),
    async execute(interaction) {
        await interaction.reply({content: secondPrompt, components: [starterSelectionRow.data.buttons]});
    }
}

var avatarSelectionRow = new MessageActionRow()
    .addComponents( maleav1.button, femaleav1.button );

exports.avatarSelectionRow = {
	data: {
        name: 'avatarSelectionRow',
        buttons: avatarSelectionRow
    }
}

exports.maleav1 = maleav1;
exports.femaleav1 = femaleav1;