const userMap = require('../objects/userMap.js');
const messageHandler = require('../handlers/MessageHandler.js');
const generatePokemon = require('../util/generatePokemon.js');
const rawPokemon = require('../data/models/pokemon-raw.js');
const messages = require('../data/messages/messages.js');
const { getRole, getMember } = require('../util/getDiscordInfo.js');

const catchBot = {

    start: function(discordClient, dbClient, token, guild) {


        discordClient.once('ready', async () => {
            console.log(`catchBot: ready to serve ${userMap.size} users`);
        });

        discordClient.on('interactionCreate', async interaction => {

            console.log('interacting..');
            const btnId = interaction.customId;

            const userId = interaction.user.id;
            const currentUser = userMap.get(userId);

            if (interaction.isCommand()) {

                if (interaction.commandName === 'search') {
                    
                    if (currentUser.isInBattle) return await messageHandler.replyEphemeralMessage(interaction, { content: "Please exit your current battle before searching for another..." });

                    // currently hard coded to encounter caterpie
                    // in the future this will pull from a list of available area encounters
                    // defined by the channel
                    let raw = rawPokemon[10];
                    let generated = await generatePokemon(raw);
                    const message = await messages.msgStartBattle(generated, userId);
                    await messageHandler.replyMessage(interaction, message);

                    // lock user into battle
                    currentUser.isInBattle = true;
                    currentUser.battling = generated;
                    currentUser.battleMessage;

                }

            } else if (interaction.isMessageComponent()) {

                // guard clause to prevent users from interacting with prompts they did not initiate
                if (currentUser.id != btnId.split('|')[1]) return messageHandler.replyEphemeralMessage(interaction, { content: "This is not your battle!" });

                if (btnId.match(/attackPokemon[1-9]*/)){

                    await messageHandler.deleteMessage(interaction, 1);
                    console.log('Begin battle...');
                    // IMPLEMENT BATTLE LOGIC

                } else if (btnId.match(/swapPokemon[1-9]*/)){

                    await messageHandler.deleteMessage(interaction, 1);
                    console.log('Swapping pokemon...');
                    // IMPLEMENT SWAP LOGIC

                } else if (btnId.match(/catchPokemon[1-9]*/)){

                    await messageHandler.deleteMessage(interaction, 1);
                    console.log('Catching pokemon...');
                    // IMPLEMENT CATCH LOGIC

                } else if (btnId.match(/runPokemon[1-9]*/)){
                    
                    console.log(interaction);
                    await deleteMessage(interaction.message.channelId, interaction.message.author.id, interaction.message.id);
                    currentUser.isInBattle = false;    
                    currentUser.battling = {};

                }
            }
        });

        discordClient.login(token);

        async function deleteMessage (channel, userID, messageId) {
            discordClient.channels.fetch(channel)
                .then((ch) => {
                    ch.messages.fetch({
                        limit: 100
                    }).then(messages => {
                        const msgs = messages.filter(m => m.author.id === userID)
                        msgs.forEach(m => {
                            if(m.id === messageId){
                                m.delete();
                            }
                        })
                    });
                })
        }
    }

}

module.exports = catchBot;