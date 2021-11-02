const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');
const fs = require('fs');

const commandsList = [];
const commands = fs.readdirSync('./src/commands/').filter(file => file.endsWith('.js'));

const rest = new REST({ version: '9' }).setToken(token);

for (const file of commands) {
	const command = require(`./src/commands/${file}`);
	commandsList.push(command.data.toJSON());
}

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commandsList },
		);

		console.log('Successfully reloaded application (/) commands.');
		
	} catch (error) {
		console.error(error);
	}
})();