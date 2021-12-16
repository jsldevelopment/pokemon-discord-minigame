// objs
const MessageManager = require('../managers/MessageManager');

// data
const messages = require('../data/messages/messages.js');
const pokemon = require('../data/models/pokemon');
const { registerNewUser, getUser } = require('../db/queries');
const userMap = require('../objects/userMap');

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

                    const starter = pokemon[interaction.options.getInteger('starter')];
                    const id = interaction.user.id;

                    // write user json to db/db.txt
                    registerNewUser(id, starter);

                }

                if (interaction.commandName === 'catch') {

                    console.log('catching...');
                    // roll a random new pokemon
                    // add that pokemon to user json in db/db.txt
                    console.log(userMap.get(interaction.user.id));

                }

                if (interaction.commandName === 'battle') {

                    console.log('battle...');
                    // roll a random new pokemon
                    // how do we want to control who battles whom?
                    const player = userMap.get(interaction.user.id);
                    console.log(player.party);

                }
            }
        });

        discordClient.login(token);

    }

}

module.exports = bot;