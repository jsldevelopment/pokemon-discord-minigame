const userMap = require('../objects/userMap.js');

const catchBot = {

    start: function(discordClient, dbClient, token, guild) {

        discordClient.once('ready', async () => {
            console.log(`catchBot: ready to serve ${userMap.size} users`);
        });

        discordClient.on('interactionCreate', async interaction => {

            if (interaction.isCommand()) {

                if (interaction.commandName === 'profile') {
                    await interaction.deferReply();
                    const result = await queries.getUser(dbClient, { id: interaction.user.id });
                    const resMessage = await messages.msgShowProfile(result);
                    await messageHandler.editMessage(interaction, resMessage);
                }
            }
        });


        discordClient.login(token);

    }

}

module.exports = catchBot;