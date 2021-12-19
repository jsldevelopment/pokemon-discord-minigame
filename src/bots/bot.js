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

                // simple registration script
                if (interaction.commandName === 'register') {

                    const starter = pokemon[interaction.options.getInteger('starter')];
                    const id = interaction.user.id;

                    userMap.set(id, {
                        "id": id,
                        "party": [{...starter, level: 1 }],
                        "box": [],
                        "expedition": {
                            active: false,
                            returning: 0,
                            expLength: 0
                        }
                    })

                    messageManager.replyMessage(`Succesfully registered new user ${interaction.user}`);

                }

                // go on an expedition with lead pokemon
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
                            returning: Date.now() + 500,
                            expLength: 10
                        }
                    }

                    // if user is currently on an expedition, we need to evaluate if they are done or not

                    // if current time is greater than the return time of the exp
                    if (Date.now() > user.expedition.returning) {
                        messageManager.replyMessage(
                            this.resolveExpedition(user, areaFound)
                        );
                        return user.expedition = {
                            active: false,
                            returning: 0
                        }
                    }

                    // else, they are still on an expedition
                    return messageManager.replyMessage(`You are currently on an expedition until ${this.getReturnTime(user.expedition.returning)}!`);

                }

                // display current party in detail
                if (interaction.commandName === 'party') {

                    const party = userMap.get(interaction.user.id).party;
                    let reply = "";
                    party.forEach(pokemon => {
                        reply += `Level ${pokemon.level} ${pokemon.dex.name}, \n`;
                    })
                    messageManager.replyMessage(reply);

                }

                // display high level overview of box pokemon
                if (interaction.commandName === 'box') {

                    const box = userMap.get(interaction.user.id).box;
                    let reply = "";
                    if (!box.length) reply = "Sorry, your box is empty!";
                    box.forEach(pokemon => {
                        reply += `Level ${pokemon.level} ${pokemon.dex.name}, \n`;
                    })
                    messageManager.replyMessage(reply);

                }

                // TODO: add swapping command for party -> box and vice versa
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

    resolveExpedition: function(user, area) {

        // eventual message back to user
        let reply = "";

        // determine all pokemon found
        const caught = [];
        for (let i = 0; i < user.expedition.expLength; i++) {
            const foundPokemon = area.available[Math.floor(Math.random() * area.available.length)].id;
            if (Math.random() > .5) caught.push(foundPokemon);
        }
        reply += `Captured Pokemon: ${caught.length} \n`;

        // get id array of all owned pokemon
        const ownedPokemon = user.party.concat(user.box);
        const ownedPokemonIds = [];
        ownedPokemon.forEach(pokemon => ownedPokemonIds.push(pokemon.id));

        // all pokemon found that are already owned
        const caughtOld = caught.filter(id => ownedPokemonIds.includes(id));

        // all pokemon found that are new
        const caughtNew = caught.filter(id => !ownedPokemonIds.includes(id));
        const caughtNewFiltered = [...new Set(caughtNew)];

        caughtNewFiltered.forEach((newId) => {
            reply += `You caught a ${pokemon[newId].dex.name} on your expedition! \n`;
        });

        // update levels/exp for pokemon already owned
        const caughtMap = new Map();
        caughtOld.forEach((caught) => {
            if (!caughtMap.get(caught)) {
                caughtMap.set(caught, 1);
            } else {
                const numCaught = caughtMap.get(caught) + 1;
                caughtMap.set(caught, numCaught);
            }
        });

        caughtMap.forEach((value, key) => {
            reply += `Old pokemon converted to token: ${pokemon[key].dex.name} : ${value} \n`;
        })

        // for now, just increment level by the number of tokens. no exp gains.
        caughtMap.forEach((value, key) => {
            ownedPokemon.find(pokemon => pokemon.id === key).level += value;
        })

        // add all new pokemon to box/party
        caughtNewFiltered.forEach((caught) => {
            if (user.party.length >= 3) {
                user.box.push({...pokemon[caught], level: 1 });
            } else {
                user.party.push({...pokemon[caught], level: 1 });
            }
        });

        return reply;
    }

}

module.exports = bot;