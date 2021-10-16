const { SlashCommandBuilder } = require('@discordjs/builders');
const { guildId } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('Kicks and reinvites a user for faster testing.'),
	async execute(interaction, client) {
        const userToKick = await client.users.fetch('830158540051578920');
        const guild = client.guilds.cache.get(guildId);
        console.log(`guild: ${guild}`);
        let member = guild.members.get('830158540051578920');
        console.log(member);
        member.kick();
	}
};