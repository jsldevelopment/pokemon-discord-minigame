const messageHandler = require('../handlers/MessageHandler.js');
const messages = require('../data/messages.js');
const queries = require('../db/queries.js');
const generatePokemon = require('../util/generatePokemon.js');
const rawPokemon = require('../db/models/pokemon-raw.js');
const { getRole, getMember } = require('../util/getDiscordInfo.js');
const { default: Collection } = require('@discordjs/collection');

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
                    console.log(interaction.user.id);
                    const result = await queries.getUser(dbClient, { id: interaction.user.id });
                    const resMessage = await messages.msgShowProfile(result);
                    await messageHandler.editMessage(interaction, resMessage);
                }

            } else if (interaction.isMessageComponent()) {
                    
                const memObj = await getMember(discordClient, userId);
                const userObj = discordClient.registeringUsers.get(userId);

                switch (interaction.customId) {

                    // TODO: clean up and standardize these methods
                    case('beginRegistration'):
                        await messageHandler.deleteMessage(interaction, 1);
                        await messageHandler.sendDirectMessage(memObj, messages.msgSelectAvatar);
                        discordClient.registeringUsers.set(userId, { id: userId });
                        break;
                    case('selectAvatar1'):
                        await messageHandler.deleteMessage(interaction, 1);
                        await messageHandler.sendDirectMessage(memObj, messages.msgSelectStarter);
                        discordClient.registeringUsers.set(userId, { ...userObj, avatar: 1 });
                        break;
                    case('selectAvatar2'):
                        await messageHandler.deleteMessage(interaction, 1);
                        await messageHandler.sendDirectMessage(memObj, messages.msgSelectStarter);
                        discordClient.registeringUsers.set(userId, { ...userObj, avatar: 2 });
                        break;
                    case('selectStarter1'):
                        await messageHandler.deleteMessage(interaction, 1);
                        await messageHandler.sendLoadingMessage(memObj);
                        let starter1 = rawPokemon[1];
                        let starter1gen = await generatePokemon(starter1);
                        queries.insertPokemon(dbClient, { owner_id: userObj.id,  pokemon_id: starter1gen.uuid, pokemon: [starter1gen] });
                        discordClient.registeringUsers.set(userId, { ...userObj, party: starter1gen });
                        await messageHandler.deleteMessage(interaction, 1);
                        await messageHandler.sendDirectMessage(memObj, messages.msgConfirmRegistration);
                        break;
                    case('selectStarter2'):
                        await messageHandler.deleteMessage(interaction, 1);
                        await messageHandler.sendLoadingMessage(memObj);
                        let starter2 = rawPokemon[4];
                        let starter2gen = await generatePokemon(starter2);
                        queries.insertPokemon(dbClient, { owner_id: userObj.id,  pokemon_id: starter2gen.uuid, pokemon: [starter2gen] });
                        discordClient.registeringUsers.set(userId, { ...userObj, party: starter2gen });
                        await messageHandler.deleteMessage(interaction, 1);
                        await messageHandler.sendDirectMessage(memObj, messages.msgConfirmRegistration);
                        break;
                    case('selectStarter3'):
                        await messageHandler.deleteMessage(interaction, 1);
                        await messageHandler.sendLoadingMessage(memObj);
                        let starter3 = rawPokemon[7];
                        let starter3gen = await generatePokemon(starter3);
                        queries.insertPokemon(dbClient, { owner_id: userObj.id,  pokemon_id: starter3gen.uuid, pokemon: [starter3gen] });
                        discordClient.registeringUsers.set(userId, { ...userObj, party: starter3gen });
                        await messageHandler.deleteMessage(interaction, 1);
                        await messageHandler.sendDirectMessage(memObj, messages.msgConfirmRegistration);
                        break;
                    case('confirmRegistration'):
                        await messageHandler.deleteMessage(interaction, 1);
                        await messageHandler.sendLoadingMessage(memObj);
                        await queries.insertUser(dbClient, { id: userObj.id, avatar: userObj.avatar, party: userObj.party });
                        memObj.roles.add(await getRole(discordClient, "trainer"));
                        await messageHandler.deleteMessage(interaction, 1);
                        break;
                }
            }

        });

        discordClient.login(token);

    }

}

module.exports = bot;