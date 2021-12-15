const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('catch')
        .setDescription('catch a pokemon')
        .addStringOption(option =>
            option.setName('area')
            .setDescription('what would you like to catch?')
            .setRequired(true))
}