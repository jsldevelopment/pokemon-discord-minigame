const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');
const { firstPrompt } = require ('./prompts/registerUserText.js');
const { avatarSelectionRow, maleav1, femaleav1 } = require('./prompts/avatarSelection.js');
const { starter1, starter2, starter3 } = require('./prompts/starterSelection.js');
const { rules } = require('./prompts/rulesSelection.js');

// instantiate client and intents
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS] });

// create new collection for commands
client.commands = new Collection();
// find all command files
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
// create new collection for button menus
client.buttons = new Collection();
client.buttons.set('maleav1', maleav1);
client.buttons.set('femaleav1', femaleav1);
client.buttons.set('starter1', starter1);
client.buttons.set('starter2', starter2);
client.buttons.set('starter3', starter3);
client.buttons.set('rules', rules);

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
	await member.send({content: firstPrompt, components: [avatarSelectionRow.data.buttons]});
});

// as of now, all interactions are either slash commands or buttons
client.on('interactionCreate', interaction => {

	// console.log(interaction);

	// is this interaction a command
	// if (interaction.isCommand()) {
	// 	executeCommand();
	// // or a button?
	// } else if (interaction.isMessageComponent()) {
		executeButton(interaction);
	// }

});

// async function executeCommand(interaction) {

// 	// get interaction from list
// 	const command = client.commands.get(interaction.commandName);

// 	// if not in list, return
// 	if (!command) return;

// 	// execute command
// 	try {
// 		await command.execute(interaction, client);
// 	} catch (error) {
// 		console.error(error);
// 		return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
// 	}

// }

async function executeButton(interaction) {
	console.log(interaction);
	// get interaction from list
	const button = client.buttons.get(interaction.customId);
	console.log(button);
	// if not in list, return
	if (!button) return;

	// execute command
	try {
		console.log(`executing button logic ${JSON.stringify(button)}`);
		await button.execute(interaction);
	} catch (error) {
		console.error(error);
		return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}

}

client.login(token);