const userMap = require('../objects/userMap.js');
const MessageManager = require('../managers/MessageManager');
const generatePokemon = require('../util/generatePokemon.js');
const messages = require('../data/messages/messages.js');
const { getRole, getMember } = require('../util/getDiscordInfo.js');

const catchBot = {

    start: function(discordClient, dbClient, token, guild) {

        let messageManager = new MessageManager(discordClient);

        discordClient.once('ready', async () => {
            console.log(`catchBot: ready to serve ${userMap.size} users`);
        });

        discordClient.on('interactionCreate', async interaction => {

            messageManager.setInteraction(interaction);

            const userId = interaction.user.id;
            const currentUser = userMap.get(userId);

            if (interaction.isCommand()) {

                const cmdId = interaction.commandName;

                if (cmdId === 'search') {
                    
                    if (currentUser.isInBattle) return await messageManager.replyAlreadyInBattle();

                    // currently hard coded to encounter caterpie
                    // in the future this will pull from a list of available area encounters
                    // defined by the channel
                    const generated = await generatePokemon(10, 5);
                    const message = await messages.msgStartBattle(generated, userId);
                    await messageManager.replyMessage(message);

                    // lock user into battle
                    currentUser.isInBattle = true;
                    currentUser.battling = generated;

                }

            } else if (interaction.isMessageComponent()) {

                const btnId = interaction.customId;

                messageManager.setButtonDetails();

                // guard clause to prevent users from interacting with prompts they did not initiate
                if (currentUser.id != btnId.split('|')[1]) return messageManager.replyNotYourBattle();

                if (btnId.match(/attackPokemon[1-9]*/)){

                    await messageManager.deleteThisMessage();
                    console.log('Begin battle...');
                    // IMPLEMENT BATTLE LOGIC

                } else if (btnId.match(/swapPokemon[1-9]*/)){

                    await messageManager.deleteThisMessage();
                    console.log('Swapping pokemon...');
                    // IMPLEMENT SWAP LOGIC

                } else if (btnId.match(/catchPokemon[1-9]*/)){

                    await messageManager.deleteThisMessage();
                    console.log('Catching pokemon...');
                    // IMPLEMENT CATCH LOGIC

                } else if (btnId.match(/runPokemon[1-9]*/)){
                    
                    await messageManager.deleteThisMessage();
                    // reset user battle settings
                    currentUser.isInBattle = false;
                    currentUser.battling = {};

                }
            }
        });

        discordClient.login(token);

    }

}

module.exports = catchBot;