const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');
const messageManager = require('./managers/messageManager.js');


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

client.on('guildMemberAdd', async member => {
	messageManager.sendPrivateMessage(member, "welcomeMessage");
});

// as of now, all interactions are either slash commands or buttons
client.on('interactionCreate', async interaction => {

	if (interaction.isCommand()) {
		
		// implement command manager

	} else if (interaction.isMessageComponent()) {

		messageManager.onButtonPress(
			interaction,
			interaction.customId, 
			{
				userMap: client.registeringUsers, 
				user: interaction.user.id,
				btnId: interaction.customId
			}
		);

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