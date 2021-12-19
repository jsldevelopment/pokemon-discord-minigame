// objs
const MessageManager = require('../managers/MessageManager');

// data
const messages = require('../data/messages/messages.js');
const pokemon = require('../data/models/pokemon');
const area = require('../data/models/area');
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
                        "box": [],
                        "expedition": {
                            active: false,
                            returning: 0,
                            expLength: 0
                        }
                    })

                    messageManager.replyMessage(`Succesfully registered new user ${interaction.user}`);

                }

                if (interaction.commandName === 'expedition') {

                    // get user and check to ensure area exists
                    const user = userMap.get(interaction.user.id);
                    const areaFound = area[interaction.options.getString('area')];

                    if (!areaFound) return messageManager.replyMessage(`That area does not exist.`);

                    // if user isnt currently on an expedition, send them on one and set the new expedition details
                    if (!user.expedition.active) {
                        messageManager.replyMessage(`Going on a 20 second expedition to ${areaFound.name}`);
                        return user.expedition = {
                            active: true,
                            returning: Date.now() + 20000,
                            expLength: 3
                        }
                    }

                    // if user is currently on an expedition, we need to evaluate if they are done or not

                    // if current time is greater than the return time of the exp
                    if (Date.now() > user.expedition.returning) {
                        const results = this.resolveExpedition(user.expedition.expLength, areaFound);
                        let reply = "";
                        if (!results.length) {
                            reply = "Sorry, nothing was found during this expedition!";
                        }
                        results.forEach(pokemon => {
                            if (user.party.length >= 3) {
                                user.box.push(pokemon);
                            } else {
                                user.party.push(pokemon);
                            }
                            reply += pokemon.dex.name + ", ";
                        })
                        messageManager.replyMessage(reply);
                        return user.expedition = {
                            active: false,
                            returning: 0
                        }
                    }

                    // else, they are still on an expedition
                    return messageManager.replyMessage(`You are currently on an expedition until ${this.getReturnTime(user.expedition.returning)}!`);

                }

                if (interaction.commandName === 'party') {

                    const party = userMap.get(interaction.user.id).party;
                    let reply = "";
                    party.forEach(pokemon => {
                        reply += pokemon.dex.name + ", ";
                    })
                    messageManager.replyMessage(reply);

                }

                if (interaction.commandName === 'box') {

                    const box = userMap.get(interaction.user.id).box;
                    let reply = "";
                    if (!box.length) reply = "Sorry, your box is empty!";
                    box.forEach(pokemon => {
                        reply += pokemon.dex.name + ", ";
                    })
                    messageManager.replyMessage(reply);

                }
            }
        });

        discordClient.login(token);

    },

    getReturnTime: function(ts) {
        let now = new Date(ts);
        return now.getHours() + ':' +
            ((now.getMinutes() < 10) ? ("0" + now.getMinutes()) : (now.getMinutes())) + ':' + ((now.getSeconds() < 10) ? ("0" + now
                .getSeconds()) : (now.getSeconds()));
    },

    resolveExpedition: function(expLength, area) {
        const caught = [];
        for (let i = 0; i < expLength; i++) {
            const foundPokemon = area.available[0];
            if (Math.random() > .5) caught.push(foundPokemon);
        }
        return caught;
    }


}

module.exports = bot;