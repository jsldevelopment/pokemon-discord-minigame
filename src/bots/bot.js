const messageHandler = require('../handlers/MessageHandler.js');
const messages = require('../data/messages.js');
const queries = require('../db/queries.js');
const generatePokemon = require('../util/generatePokemon.js');
const rawPokemon = require('../db/models/pokemon-raw.js');
const { getRole, getMember } = require('../util/getDiscordInfo.js');
const { default: Collection } = require('@discordjs/collection');
const { stringify } = require('uuid');

const bot = {

    start: function(discordClient, dbClient, token, guild) {

        discordClient.registeringUsers = new Collection();

        discordClient.once('ready', () => {
            console.log('ready');
        });

        discordClient.on('guildMemberAdd', async member => {
            await messageHandler.sendDirectMessage(
                member, 
                messages["msgWelcome"]
            );
        });

        discordClient.on('interactionCreate', async interaction => {

            const userId = interaction.user.id;

            if (interaction.isCommand()) {

                if (interaction.commandName === 'profile') {
                    await interaction.deferReply();
                    const result = await queries.getUser(dbClient, { id: interaction.user.id });
                    const resMessage = await messages.msgShowProfile(result);
                    await messageHandler.editMessage(interaction, resMessage);
                }

            } else if (interaction.isMessageComponent()) {
                    
                const memObj = await getMember(discordClient, userId);
                const userObj = discordClient.registeringUsers.get(userId);
                const label = interaction.customId;

                // TODO: clean up and standardize these methods
                if (label === 'beginRegistration'){
                    await messageHandler.deleteMessage(interaction, 1);
                    await messageHandler.sendDirectMessage(memObj, messages.msgSelectAvatar);
                    discordClient.registeringUsers.set(userId, { id: userId });
                }
                if (label.match(/selectAvatar[1-9]*/)) {
                    await messageHandler.deleteMessage(interaction, 1);
                    await messageHandler.sendDirectMessage(memObj, messages.msgSelectStarter);
                    discordClient.registeringUsers.set(userId, { ...userObj, avatar: label.charAt(label.length-1) });
                }
                if (label.match(/selectStarter[1-9]*/)) {
                    await messageHandler.deleteMessage(interaction, 1);
                    await messageHandler.sendLoadingMessage(memObj);
                    let starter = rawPokemon[label.charAt(label.length-1)];
                    let starter1gen = await generatePokemon(starter);
                    queries.insertPokemon(dbClient, { owner_id: userObj.id,  pokemon_id: starter1gen.uuid, pokemon: starter1gen });
                    discordClient.registeringUsers.set(userId, { ...userObj, party: starter1gen });
                    await messageHandler.deleteMessage(interaction, 1);
                    await messageHandler.sendDirectMessage(memObj, messages.msgConfirmRegistration);
                }
                if (label === 'confirmRegistration') {
                    await messageHandler.deleteMessage(interaction, 1);
                    await messageHandler.sendLoadingMessage(memObj);
                    await queries.insertUser(dbClient, { id: userObj.id, avatar: userObj.avatar, party: userObj.party });
                    memObj.roles.add(await getRole(discordClient, "trainer"));
                    await messageHandler.deleteMessage(interaction, 1);
                }
            }

        });

        discordClient.login(token);

    }

}

module.exports = bot;