const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('battle')
        .setDescription('battle a pokemon')
        .addStringOption(option =>
            option.setName('area')
            .setDescription('where would you like to battle?')
            .setRequired(true))
}