const messageHandler = require('../handlers/MessageHandler.js');
const messages = require('../data/messages.js');
const queries = require('../db/queries.js');
const generatePokemon = require('../util/generatePokemon.js');
const rawPokemon = require('../db/models/pokemon-raw.js');
const { getRole, getMember } = require('../util/getDiscordInfo.js');
const { default: Collection } = require('@discordjs/collection');

const profBot = {

    start: function(discordClient, dbClient, token, guild) {

        discordClient.activeUsers = new Collection();
        const userMap = discordClient.activeUsers;

        discordClient.once('ready', async () => {
            // const users = await queries.getAllUsers(dbClient);
            // // add each user to our map
            // users.rows.forEach((row) => {
            //     userMap.set(row.id, JSON.parse(row.data));
            //     console.log(JSON.parse(row.data));
            // })
            console.log(`profBot: ready`);
        });

        discordClient.on('guildMemberAdd', async member => {
            await messageHandler.sendDirectMessage(
                member, 
                messages["msgWelcome"]
            );
        });

        discordClient.on('interactionCreate', async interaction => {

            const userId = interaction.user.id;
            const currentUser = userMap.get(userId);

            if (interaction.isCommand()) {

                if (interaction.commandName === 'profile') {
                    await interaction.deferReply();
                    const result = await queries.getUser(dbClient, { id: interaction.user.id });
                    const resMessage = await messages.msgShowProfile(result);
                    await messageHandler.editMessage(interaction, resMessage);
                }

                // get member of team based on number 1-6
                // TODO: build prompts to display indiividual team members
                if (interaction.commandName === 'team') {
                   const member = interaction.options.getSubcommand();
                   switch(member){
                        case('1'):
                            console.log(`pokemon 1: \n ${JSON.stringify(currentUser.party[0].name)}`);
                            const resMessage = await messages.msgShowPokemon(currentUser.party[0]);
                            messageHandler.replyEphemeralMessage(interaction, resMessage);
                            break;
                        case('2'):
                            console.log('yo');
                            break;
                        case('3'):
                            console.log('yo');
                            break;
                        case('4'):
                            console.log('yo');
                            break;
                        case('5'):
                            console.log('yo');
                            break;
                        case('6'):
                            console.log('yo');
                            break;
                   }
                }

            } else if (interaction.isMessageComponent()) {
                    
                const memObj = await getMember(discordClient, userId);
                user = memObj.user;
                const userObj = userMap.get(userId);
                const label = interaction.customId;

                // TODO: clean up and standardize these methods
                if (label === 'beginRegistration'){

                    await messageHandler.deleteMessage(interaction, 1);
                    await messageHandler.sendDirectMessage(memObj, messages.msgSelectAvatar);
                    userMap.set(userId, { id: userId });

                } else if (label.match(/selectAvatar[1-9]*/)) {

                    await messageHandler.deleteMessage(interaction, 1);
                    await messageHandler.sendDirectMessage(memObj, messages.msgSelectStarter);
                    userMap.set(userId, { ...userObj, avatar: label.charAt(label.length-1) });

                } else if (label.match(/selectStarter[1-9]*/)) {

                    await messageHandler.deleteMessage(interaction, 1);
                    await messageHandler.sendLoadingMessage(memObj);
                    let starter = rawPokemon[label.charAt(label.length-1)];
                    let starter1gen = await generatePokemon(starter);
                    queries.insertPokemon(dbClient, { owner_id: userObj.id,  pokemon_id: starter1gen.uuid, pokemon: starter1gen });
                    userMap.set(userId, { ...userObj, party: starter1gen });
                    await messageHandler.deleteMessage(interaction, 1);
                    await messageHandler.sendDirectMessage(memObj, messages.msgConfirmRegistration);
                    
                } else if (label === 'confirmRegistration') {

                    await messageHandler.deleteMessage(interaction, 1);
                    await messageHandler.sendLoadingMessage(memObj);
                    await queries.insertUser(dbClient,
                        interaction.user.id,
                        {
                            username: memObj.user.username,
                            avatar: userObj.avatar,
                            pkmnCaught: 1,
                            pkmnSeen: 1,
                            badges: 0,
                            money: 5000,
                            party: [userObj.party]
                        }
                    );
                    memObj.roles.add(await getRole(discordClient, "trainer"));
                    await messageHandler.deleteMessage(interaction, 1);

                }
            }

        });

        discordClient.login(token);

    }

}

module.exports = profBot;