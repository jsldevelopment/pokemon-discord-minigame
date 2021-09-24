const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong2!'),
	async execute(interaction) {
		await interaction.reply('Pong!');
	}
};