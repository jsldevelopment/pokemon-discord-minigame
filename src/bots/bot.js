const messageHandler = require('../handlers/MessageHandler.js');
const messages = require('../data/messages.js');
const queries = require('../db/queries.js');
const generatePokemon = require('../util/generatePokemon.js');
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

            if (interaction.isCommand()) {

                if (interaction.commandName === 'profile') {
                    await interaction.deferReply();
                    console.log(interaction.user.id);
                    const result = await queries.getUser(dbClient, { id: interaction.user.id });
                    const resMessage = await messages.msgShowProfile(result);
                    await messageHandler.editMessage(interaction, resMessage);
                }

            } else if (interaction.isMessageComponent()) {
                    
                const user = discordClient.registeringUsers.get(interaction.user.id);

                switch (interaction.customId) {

                    // TODO: clean up and standardize these methods
                    case('beginRegistration'):
                        await messageHandler.updateMessage(interaction, messages.msgSelectAvatar);
                        discordClient.registeringUsers.set(interaction.user.id, { id: interaction.user.id });
                        break;
                    case('selectAvatar1'):
                        await messageHandler.updateMessage(interaction, messages.msgSelectStarter);
                        discordClient.registeringUsers.set(interaction.user.id, { ...user, avatar: 1 });
                        break;
                    case('selectAvatar2'):
                        await messageHandler.updateMessage(interaction, messages.msgSelectStarter);
                        discordClient.registeringUsers.set(interaction.user.id, { ...user, avatar: 2 });
                        break;
                    case('selectStarter1'):
                        await messageHandler.showLoading(interaction);
                        let starter1 = await queries.getRawPokemon(dbClient, { id: 1 });
                        let starter1gen = await generatePokemon(JSON.parse(starter1));
                        queries.insertPokemon(dbClient, { owner_id: user.id,  pokemon_id: starter1gen.uuid, pokemon: starter1gen });
                        discordClient.registeringUsers.set(interaction.user.id, { ...user, party: starter1gen });
                        await messageHandler.editMessage(interaction, messages.msgConfirmRegistration);
                        break;
                    case('selectStarter2'):
                        await messageHandler.showLoading(interaction);
                        let starter2 = await queries.getRawPokemon(dbClient, { id: 4 });
                        let starter2gen = await generatePokemon(JSON.parse(starter2));
                        discordClient.registeringUsers.set(interaction.user.id, { ...user, party: starter2gen });
                        await messageHandler.editMessage(interaction, messages.msgConfirmRegistration);
                        break;
                    case('selectStarter3'):
                        await messageHandler.showLoading(interaction);
                        let starter3 = await queries.getRawPokemon(dbClient, { id: 7 });
                        let starter3gen = await generatePokemon(JSON.parse(starter3));
                        discordClient.registeringUsers.set(interaction.user.id, { ...user, party: starter3gen });
                        await messageHandler.editMessage(interaction, messages.msgConfirmRegistration);
                        break;
                    case('confirmRegistration'):
                        await messageHandler.showLoading(interaction);
                        await queries.insertUser(dbClient, { id: user.id, avatar: user.avatar, party: user.party });
                        let member = await getMember(discordClient, interaction.user.id);
                        member.roles.add(await getRole(discordClient, "trainer"));
                        await messageHandler.deleteMessage(interaction, 1);
                        break;

                }
            }

        });

        discordClient.login(token);

    }

}

module.exports = bot;