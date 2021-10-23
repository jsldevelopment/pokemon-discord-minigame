const messageHandler = require('../handlers/MessageHandler.js');
const messages = require('../data/messages.js');
const insertUser = require('../db/queries.js');
const { default: Collection } = require('@discordjs/collection');

const bot = {

    start: function(discordClient, dbClient, token) {

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

            const user = discordClient.registeringUsers.get(interaction.user.id);
            switch (interaction.customId) {

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
                    await messageHandler.updateMessage(interaction, messages.msgConfirmRegistration);
                    discordClient.registeringUsers.set(interaction.user.id, { ...user, starter: 1});
                    break;
                case('selectStarter2'):
                    await messageHandler.updateMessage(interaction, messages.msgConfirmRegistration);
                    discordClient.registeringUsers.set(interaction.user.id, { ...user, starter: 2 });
                    break;
                case('selectStarter3'):
                    await messageHandler.updateMessage(interaction, messages.msgConfirmRegistration);
                    discordClient.registeringUsers.set(interaction.user.id, { ...user, starter: 3 });
                    break;
                case('confirmRegistration'):
                    await messageHandler.deleteMessage(interaction);
                    // await insertUser(dbClient, { id: user.id, avatar: user.avatar, starter: user.starter });
                    let member = await getMember(interaction.user.id);
                    var role = member.guild.roles.cache.find(role => role.name === "trainer");
                    member.roles.add(role);
                    break;

            }

        });

        discordClient.login(token);

        getMember = async function(id) {
            
            if (!discordClient) return;
            
            let member = await discordClient.guilds.cache.get('889622087822639125').members.fetch(id);
            return member;

        }
    
    }

}

module.exports = bot;