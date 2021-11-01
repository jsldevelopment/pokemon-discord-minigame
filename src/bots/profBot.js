const MessageManager = require('../managers/MessageManager.js');
const messages = require('../data/messages/messages.js');
const queries = require('../db/queries.js');
const generatePokemon = require('../util/generatePokemon.js');
const { getRole, getMember } = require('../util/getDiscordInfo.js');
const userMap = require('../objects/userMap.js');
const { default: Collection } = require('@discordjs/collection');

const profBot = {


    start: function(discordClient, dbClient, token, guild) {

        const registeringUsers = new Collection();
        let messageManager = new MessageManager(discordClient);

        discordClient.once('ready', async () => {
            console.log(`profBot: ready to serve ${userMap.size} users`);
        });

        discordClient.on('guildMemberAdd', async member => {
            await messageManager.sendDirectMessage(
                member, 
                messages["msgWelcome"]
            );
        });

        discordClient.on('interactionCreate', async interaction => {

            messageManager.setInteraction(interaction);

            // grab the user id and perform lookup on map for every interaction
            const userId = interaction.user.id;
            const currentUser = userMap.get(userId);

            if (interaction.isCommand()) {

                const cmdId = interaction.commandName;
                
                if (cmdId === 'profile') {

                    await interaction.deferReply();
                    const result = await queries.getUser(dbClient, { id: userId });
                    const resMessage = await messages.msgShowProfile(result);
                    await messageManager.editMessage(resMessage);

                }

                if (cmdId === 'team') {

                    console.log(JSON.stringify(currentUser.party));
                    const resMessage = await messages.msgShowPokemon(currentUser.party[interaction.options.getSubcommand() - 1]);
                    messageManager.replyEphemeralMessage(resMessage);
                    
                }   

            } else if (interaction.isMessageComponent()) {
                    
                const userId = interaction.user.id;
                const memObj = await getMember(discordClient, userId);
                const user = memObj.user;
                const label = interaction.customId;
                
                messageManager.setButtonDetails();

                // TODO: clean up and standardize these methods
                if (label === 'beginRegistration'){

                    await messageManager.deleteThisMessage();
                    await messageManager.sendDirectMessage(memObj, messages.msgSelectAvatar);
                    registeringUsers.set(userId, { id: userId });

                } else if (label.match(/selectAvatar[1-9]*/)) {

                    await messageManager.deleteThisMessage();
                    await messageManager.sendDirectMessage(memObj, messages.msgSelectStarter);
                    registeringUsers.set(userId, { ...registeringUsers.get(userId), avatar: label.charAt(label.length-1) });

                } else if (label.match(/selectStarter[1-9]*/)) {

                    await messageManager.deleteThisMessage();
                    await messageManager.sendLoadingMessage(memObj);
                    let starter1gen = await generatePokemon(label.charAt(label.length-1), 20);
                    queries.insertPokemon(dbClient, { owner_id: userId,  pokemon_id: starter1gen.uuid, pokemon: starter1gen });
                    registeringUsers.set(userId, { ...registeringUsers.get(userId), party: starter1gen });
                    await messageManager.deleteThisMessage();
                    await messageManager.sendDirectMessage(memObj, messages.msgConfirmRegistration);
                    
                } else if (label === 'confirmRegistration') {

                    await messageManager.deleteThisMessage();
                    await messageManager.sendLoadingMessage(memObj);
                    const finalUser = 
                    {
                        id: interaction.user.id,
                        username: memObj.user.username,
                        avatar: registeringUsers.get(userId).avatar,
                        pkmnCaught: 1,
                        pkmnSeen: 1,
                        badges: 0,
                        money: 5000,
                        party: [registeringUsers.get(userId).party],
                        isInBattle: false,
                        battling: {}
                    };
                    console.log(finalUser);
                    await queries.insertUser(dbClient, interaction.user.id, finalUser);
                    userMap.set(userId, finalUser);
                    memObj.roles.add(await getRole(discordClient, "trainer"));
                    console.log(JSON.stringify(finalUser));
                    await messageManager.deleteThisMessage();

                }
            }

        });

        discordClient.login(token);

    }

}

module.exports = profBot;