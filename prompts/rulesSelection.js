const { MessageActionRow, MessageButton } = require('discord.js');

const rules = {
    button: new MessageButton()
        .setCustomId('rules')
        .setStyle('PRIMARY')
        .setEmoji({
            "id": "899008800806273164",
        }),
    async execute(interaction) {
        interaction.reply("Registration Complete!");
    }
}

var rulesAgreementRow = new MessageActionRow()
    .addComponents( rules.button );

exports.rulesAgreementRow = {
	data: {
        name: 'rulesAgreementRow',
        buttons: rulesAgreementRow
    }
}

exports.rules = rules;