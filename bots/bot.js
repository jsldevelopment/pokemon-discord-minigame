const messageHandler = require('../handlers/MessageHandler.js');
const messages = require('../data/messages.js');
const { default: Collection } = require('@discordjs/collection');

const bot = {

    start: function(client, token) {

        client.registeringUsers = new Collection();

        client.once('ready', () => {
            console.log('ready');
        });

        client.on('guildMemberAdd', async member => {
            await messageHandler.sendDirectMessage(
                member, 
                messages["msgWelcome"]
            );
        });

        client.on('interactionCreate', async interaction => {

            const user = client.registeringUsers.get(interaction.user.id);

            switch (interaction.customId) {

                case('beginRegistration'):
                    await messageHandler.updateMessage(interaction, messages.msgSelectAvatar);
                    client.registeringUsers.set(interaction.user.id, { id: interaction.user.id });
                    break;
                case('selectAvatar1'):
                    await messageHandler.updateMessage(interaction, messages.msgSelectStarter);
                    client.registeringUsers.set(interaction.user.id, { ...user, avatar: 'avatar1' });
                    break;
                case('selectAvatar2'):
                    await messageHandler.updateMessage(interaction, messages.msgSelectStarter);
                    client.registeringUsers.set(interaction.user.id, { ...user, avatar: 'avatar2' });
                    break;
                case('selectStarter1'):
                    await messageHandler.updateMessage(interaction, messages.msgConfirmRegistration);
                    client.registeringUsers.set(interaction.user.id, { ...user, starter: 'starter1' });
                    break;
                case('selectStarter2'):
                    await messageHandler.updateMessage(interaction, messages.msgConfirmRegistration);
                    client.registeringUsers.set(interaction.user.id, { ...user, starter: 'starter2' });
                    break;
                case('selectStarter3'):
                    await messageHandler.updateMessage(interaction, messages.msgConfirmRegistration);
                    client.registeringUsers.set(interaction.user.id, { ...user, starter: 'starter3' });
                    break;
                case('confirmRegistration'):
                    await messageHandler.deleteMessage(interaction);
                    console.log(client.registeringUsers.get(interaction.user.id));
                    // give user trainer role
                    // move them to first lobby
                    // add user profile json to cassandra db
                    break;


            }

        });

        client.login(token);

    }

}

module.exports = bot;