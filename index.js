const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');
const { prompts, embeds, promptFunctions } = require ('./prompts/registerUserText.js');
const { rowBeginRegistration } = require('./prompts/menuBegin.js');
const { rowSelectAvatar } = require('./prompts/menuAvatar.js');
const { rowSelectStarter } = require('./prompts/menuStarter.js');
const { rowConfirmRules } = require('./prompts/menuRules.js');
const { rowConfirmReg } = require('./prompts/menuConfirmReg');

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

// create new collection for button menus
client.buttons = new Collection();
client.buttons.set('btnBeginRegistration', rowBeginRegistration.buttons.btnBeginRegistration);
client.buttons.set('btnAvatar1', rowSelectAvatar.buttons.btnAvatar1);
client.buttons.set('btnAvatar2', rowSelectAvatar.buttons.btnAvatar2);
client.buttons.set('btnStarter1', rowSelectStarter.buttons.btnStarter1);
client.buttons.set('btnStarter2', rowSelectStarter.buttons.btnStarter2);
client.buttons.set('btnStarter3', rowSelectStarter.buttons.btnStarter3);
client.buttons.set('btnRules', rowConfirmRules.buttons.btnRules);
client.buttons.set('btnConfirmReg', rowConfirmReg.buttons.btnConfirmReg);

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

		let user = client.registeringUsers.get(interaction.user.id);

		// what button was pressed?
		switch(interaction.customId) {
	
			case 'btnBeginRegistration':
				if (!user) {
					client.registeringUsers.set(interaction.user.id, { 'id': interaction.user.id });
					await executeButton(interaction, { content: prompts.promptAvatar, components: [rowSelectAvatar.data.buttons] });
					break;
				}
				executeNoResponse(interaction, {embeds: [embeds.embedBegin], components: [rowBeginRegistration.data.buttons]});
				break;
			case 'btnAvatar1':
				if (!user.avatar) {
					await executeButton(interaction, { content: prompts.promptStarter, components: [rowSelectStarter.data.buttons] });
				} else {
					executeNoResponse(interaction, { content: prompts.promptAvatar, components: [rowSelectAvatar.data.buttons] });
				}
				user.avatar = "btnAvatar1";
				break;
			case 'btnAvatar2':
				if (!user.avatar) { 
					await executeButton(interaction, { content: prompts.promptStarter, components: [rowSelectStarter.data.buttons] });
				} else {
					executeNoResponse(interaction, { content: prompts.promptAvatar, components: [rowSelectAvatar.data.buttons] });
				}
				user.avatar = 'btnAvatar2';
				break;
			case 'btnStarter1':
				if (!user.starter) {
					await executeButton(interaction, { content: prompts.promptRules, components: [rowConfirmRules.data.buttons] });
				} else {
					executeNoResponse(interaction, { content: prompts.promptStarter, components: [rowSelectStarter.data.buttons] });
				}
				user.starter = 'btnStarter1';
				break;
			case 'btnStarter2':
				if (!user.starter) {
					await executeButton(interaction, { content: prompts.promptRules, components: [rowConfirmRules.data.buttons] });
				} else {
					executeNoResponse(interaction, { content: prompts.promptStarter, components: [rowSelectStarter.data.buttons] });
				}
				user.starter = 'btnStarter2';
				break;
			case 'btnStarter3':
				if (!user.starter) {
					await executeButton(interaction, { content: prompts.promptRules, components: [rowConfirmRules.data.buttons] });
				} else {
					executeNoResponse(interaction, { content: prompts.promptStarter, components: [rowSelectStarter.data.buttons] });
				}
				user.starter = 'btnStarter3';
				break;
			case 'btnRules':
				if(!user.rulesAcknowledged){
					await executeButton(interaction, { user: user, components: [rowConfirmReg.data.buttons]  });
				} else {
					executeNoResponse(interaction, { content: prompts.promptRules, components: [rowConfirmRules.data.buttons]});
				}
				user.rulesAcknowledged = true;
				break;
			case 'btnConfirmReg': 
				await executeButton(interaction, { content: 'success' });
				break;
		}
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

async function executeButton(interaction, options) {

	console.log(interaction);
	// get interaction from list
	const button = client.buttons.get(interaction.customId);

	// if not in list, return
	if (!button) return;

	// execute command
	try {
		console.log(options);
		await button.execute(interaction, options);
	} catch (error) {
		console.error(error);
		return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}

}

// sends a blanket no response for unecessary button presses. needed to avoid errors
async function executeNoResponse(interaction, options) {
	return interaction.update(options);
}

client.login(token);