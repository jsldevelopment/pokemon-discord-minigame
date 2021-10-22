const { MessageButton } = require('discord.js');

const Button = function({ id, label, execute }) {
    this.button = new MessageButton()
        .setStyle('PRIMARY')
        .setCustomId(id)
        .setLabel(label),
    this.execute = execute;
}

exports.Button = Button;