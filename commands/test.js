const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
        data: new SlashCommandBuilder()
                .setName('test')
                .setDescription('responds with success'),
        async execute(interaction) {
                await interaction.reply('success!');
        }
};