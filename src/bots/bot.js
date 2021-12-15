// objs
const MessageManager = require('../managers/MessageManager');

// data
const messages = require('../data/messages/messages.js');
const pokemon = require('../data/models/pokemon');

const bot = {

    start: function(discordClient, dbClient, token, guild) {

        let messageManager = new MessageManager(discordClient);

        discordClient.once('ready', async() => {
            console.log(`bot is ready to serve`);
        });

        discordClient.on('interactionCreate', async interaction => {

            messageManager.setInteraction(interaction);

            if (interaction.isCommand()) {

                messageManager.setCommandDetails();

                if (interaction.commandName === 'register') {

                    // implement some command logic
                    console.log(pokemon[interaction.options.getInteger('starter')]);

                }

                if (interaction.commandName === 'catch') {

                    // implement some command logic
                    console.log('catching...');

                }

                if (interaction.commandName === 'battle') {

                    // implement some command logic
                    console.log('battle...');

                }
            }
        });

        discordClient.login(token);

    }

}

module.exports = bot;