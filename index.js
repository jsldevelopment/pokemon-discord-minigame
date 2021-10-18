const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');
const { embeds } = require ('./buttons/buttonPrompts.js');
const { rowBeginRegistration } = require('./buttons/buttonRows.js');
const { buttonMap } = require('./buttons/buttonMap.js');

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
	// prompt the user to BEGIN the registration process. the execute function on the BEGIN button
	// will instantiate an object that holds the stage of registration, as well as the JSON
	// that will be used to define the user in DB.
	await member.send({embeds: [embeds.embedBegin], components: [rowBeginRegistration.data.buttons]});
});

// as of now, all interactions are either slash commands or buttons
client.on('interactionCreate', async interaction => {

	if (interaction.isCommand()) {
		
		executeCommand(interaction);

	} else if (interaction.isMessageComponent()) {

		let userMap = client.registeringUsers;

		buttonMap[interaction.customId].execute(interaction, userMap);

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