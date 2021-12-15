const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('register')
        .setDescription('register to play')
        .addIntegerOption(option =>
            option.setName('starter')
            .setDescription('what starter would you like?')
            .setRequired(true)
            .addChoice('Bulbasaur', 1)
            .addChoice('Charmander', 4)
            .addChoice('Squirtle', 7))
}