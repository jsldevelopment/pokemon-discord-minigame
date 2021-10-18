const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');
const { embeds } = require ('./messages/messagePrompts.js');
const { rowBeginRegistration } = require('./messages/messageRows.js');
const { messageMap } = require('./messages/messageMap.js');
const { messageRows } = require('./messages/messageRows.js');

// instantiate client and intents
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS] });

// create new collection for commands
client.commands = new Collection();
client.registeringUsers = new Collection();

// find all command files
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// iterate over list of commands files
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// add commands to collection
	client.commands.set(command.data.name, command);
}

// client on ready
client.once('ready', () => {
	console.log('Ready!');
});

// wehn a new member joins server
client.on('guildMemberAdd', async member => {
	// send opening message
	await member.send( messageMap["welcomeMessage"].prompt );
});

// as of now, all interactions are either slash commands or buttons
client.on('interactionCreate', async interaction => {

	if (interaction.isCommand()) {
		
		executeCommand(interaction);

	} else if (interaction.isMessageComponent()) {

		// change this to an options object
		console.log('top level ' + interaction);
		messageMap[interaction.customId].execute(
			interaction, 
			{
				userMap: client.registeringUsers, 
				user: interaction.user.id,
				btnId: interaction.customId
			});

	}
});

async function executeCommand(interaction) {

	console.log(interaction);
	// get interaction from list
	const command = client.commands.get(interaction.commandName);

	// if not in list, return
	if (!command) return;

	// execute command
	try {
		await command.execute(interaction, client);
	} catch (error) {
		console.error(error);
		return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}

}

client.login(token);