const userMap = require('../objects/userMap.js');
const messageHandler = require('../handlers/MessageHandler.js');
const generatePokemon = require('../util/generatePokemon.js');
const rawPokemon = require('../db/models/pokemon-raw.js');
const messages = require('../data/messages.js');
const { getRole, getMember } = require('../util/getDiscordInfo.js');

const catchBot = {

    start: function(discordClient, dbClient, token, guild) {


        discordClient.once('ready', async () => {
            console.log(`catchBot: ready to serve ${userMap.size} users`);
        });

        discordClient.on('interactionCreate', async interaction => {

            const userId = interaction.user.id;
            const currentUser = userMap.get(userId);

            const memObj = await getMember(discordClient, userId);
            user = memObj.user;
            const userObj = userMap.get(userId);
            const label = interaction.customId;

            if (interaction.isCommand()) {

                if (interaction.commandName === 'search') {
                    
                    let raw = rawPokemon[10];
                    let generated = await generatePokemon(raw);
                    await messageHandler.deleteMessage(interaction, 1);
                    const message = await messages.msgStartBattle(generated);
                    messageHandler.replyEphemeralMessage(interaction, message);

                }
            }
        });

        discordClient.login(token);

    }

}

module.exports = catchBot;