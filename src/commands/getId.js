const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('getId')
        .setDescription('Responds with the calling users discord ID')
}