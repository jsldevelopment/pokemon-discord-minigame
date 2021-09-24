# DISCORD BOTS
## Documentation for Creating Your Own Discord Bot :)

 - [discord dev portal](https://discord.com/developers/applications) - 

    set up your [bot](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot) for discord. use this to register your bot and select the appropriate permissions & authorization


## Stack
### **NodeJS**
`npm i discord.js`

 - Discord.js Library
    - [getting started](https://discordjs.guide/#before-you-begin) - getting started guide for discord js
    - [full docs](https://discord.js.org/#/docs/main/stable/general/welcome) - in depth docs for discord js

## Config
### **config.json**

- Store data in json format and add to gitignore:

    ```sh
    { 
        "token": "<secret key from discord>", 
        "clientId": "<id of application>", 
        "guildId": "<id of server>" 
    }
    ```

- In index.js:

    ```sh 
    const { token, clientId, guildId } = require('./config.js');
    ```

## Client

1. instantiate new client

    `const client = new Client({ intents: [Intents.FLAGS.GUILDS] });`

2. ready check

    ```sh
    client.once('ready', () => {
        console.log('Ready!');
    });
    ```

3. login with token from config

    `client.login(<TOKEN>);`

## Commands
### **SlashCommandBuilder**

`npm i @discordjs/builders @discordjs/rest discord-api-types`

- [creating commands](https://discordjs.guide/creating-your-bot/creating-commands.html#resulting-code)

```sh
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		await interaction.reply('Pong!');
	},
};
```
> this same pattern can be used for all interactions and commands. just make sure all logic goes inside the execute() code block.

> deploy-commands.js file must be run anytime new commands are added

    - client waiting for input

```sh
    client.on('interactionCreate', async interaction => {
        if (!interaction.isCommand()) return;

        const command = client.commands.get(interaction.commandName);

        if (!command) return;

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    });
```

### **basic project layout**

```
discord-bot/
├── node_modules
├── config.json
├── deploy-commands.js
├── index.js
├── package-lock.json
└── package.json
```