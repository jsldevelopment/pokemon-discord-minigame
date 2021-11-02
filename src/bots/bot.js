// objs
const MessageManager = require('../managers/MessageManager');

// data
const messages = require('../data/messages/messages.js');

const bot = {

    start: function(discordClient, dbClient, token, guild) {

        let messageManager = new MessageManager(discordClient);

        discordClient.once('ready', async () => {
            console.log(`bot is ready to serve`);
        });

        discordClient.on('interactionCreate', async interaction => {

            messageManager.setInteraction(interaction);

            if (interaction.isCommand()) {

                messageManager.setCommandDetails();
                const cmdId = interaction.commandName;

                if (cmdId === 'getId') {
                    
                    // implement some command logic

                }

            } else if (interaction.isMessageComponent()) {

                const btnId = interaction.customId;

                messageManager.setButtonDetails();

                if (btnId.match(/accept/)){
                    
                    // implement button logic

                }
            
            }
        });

        discordClient.login(token);

    }

}

module.exports = bot;