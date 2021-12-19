// objs
const MessageManager = require('../managers/MessageManager');

// data
const messages = require('../data/messages/messages.js');
const pokemon = require('../data/models/pokemon');
const area = require('../data/models/area');
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

                    userMap.set(id, {
                        "id": id,
                        "party": [starter],
                        "expedition": {
                            active: false,
                            returning: 10000000000000
                        }
                    })

                    messageManager.replyMessage(`Succesfully registered new user ${interaction.user}`);

                }

                if (interaction.commandName === 'expedition') {

                    const user = userMap.get(interaction.user.id);
                    const areaFound = area[interaction.options.getString('area')];

                    if (!areaFound) return messageManager.replyMessage(`That area does not exist.`);
                    if (Date.now() > user.expedition.returning) {
                        user.expedition.active = false;
                        user.expedition.returning = 10000000000000;
                        return messageManager.replyMessage("Welcome back from your expedition");
                    }
                    if (user.expedition.active) return messageManager.replyMessage(`You are currently on an expedition until ${Date.parse(user.expedition.returning)}`);


                    user.expedition.active = true;
                    user.expedition.returning = Date.now() + 20000;

                    return messageManager.replyMessage(`Going on a 20 second expedition to ${areaFound.name}`);


                }

                if (interaction.commandName === 'party') {

                    const party = userMap.get(interaction.user.id).party;
                    let reply = "";
                    party.forEach(pokemon => {
                        reply += pokemon.dex.name + ", ";
                    })
                    messageManager.replyMessage(reply);

                }
            }
        });

        discordClient.login(token);

    }

}

module.exports = bot;