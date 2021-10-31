const messageHandler = require('../handlers/MessageHandler.js');
const messages = require('../data/messages/messages.js');
const queries = require('../db/queries.js');
const generatePokemon = require('../util/generatePokemon.js');
const calcStat = require('../util/calculateStat.js');
const rawPokemon = require('../data/models/pokemon-raw.js');
const { getRole, getMember } = require('../util/getDiscordInfo.js');
const userMap = require('../objects/userMap.js');

const profBot = {

    start: function(discordClient, dbClient, token, guild) {


        discordClient.once('ready', async () => {
            console.log(`profBot: ready to serve ${userMap.size} users`);
        });

        discordClient.on('guildMemberAdd', async member => {
            await messageHandler.sendDirectMessage(
                member, 
                messages["msgWelcome"]
            );
        });

        discordClient.on('interactionCreate', async interaction => {

            // grab the user id and perform lookup on map for every interaction
            const userId = interaction.user.id;
            const currentUser = userMap.get(userId);

            if (interaction.isCommand()) {

                // TODO: make profile page look good (missing data)
                if (interaction.commandName === 'profile') {
                    await interaction.deferReply();
                    const result = await queries.getUser(dbClient, { id: userId });
                    const resMessage = await messages.msgShowProfile(result);
                    await messageHandler.editMessage(interaction, resMessage);
                }

                // get member of team based on number 1-6
                // TODO: build prompts to display indiividual team members
                if (interaction.commandName === 'team') {
                   const member = interaction.options.getSubcommand();
                   switch(member){
                        case('1'):
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
                    let starter1gen = await generatePokemon(starter, 50);
                    // set starting stats
                    starter1gen.stats = {
                        hp: calcStat(starter1gen.base.hp, starter1gen.nature, starter1gen.ivs.hp, starter1gen.level, starter1gen.evs.hp, true),
                        atk: calcStat(starter1gen.base.atk, starter1gen.nature, starter1gen.ivs.atk, starter1gen.level, starter1gen.evs.atk),
                        def: calcStat(starter1gen.base.def, starter1gen.nature, starter1gen.ivs.def, starter1gen.level, starter1gen.evs.def),
                        spatk: calcStat(starter1gen.base.spatk, starter1gen.nature, starter1gen.ivs.spatk, starter1gen.level, starter1gen.evs.spatk),
                        spdef: calcStat(starter1gen.base.spdef, starter1gen.nature, starter1gen.ivs.spdef, starter1gen.level, starter1gen.evs.spdef),
                        spd: calcStat(starter1gen.base.spd, starter1gen.nature, starter1gen.ivs.spd, starter1gen.level, starter1gen.evs.spd),
                    };
                    queries.insertPokemon(dbClient, { owner_id: userObj.id,  pokemon_id: starter1gen.uuid, pokemon: starter1gen });
                    userMap.set(userId, { ...userObj, party: starter1gen });
                    await messageHandler.deleteMessage(interaction, 1);
                    await messageHandler.sendDirectMessage(memObj, messages.msgConfirmRegistration);
                    
                } else if (label === 'confirmRegistration') {

                    await messageHandler.deleteMessage(interaction, 1);
                    await messageHandler.sendLoadingMessage(memObj);
                    const finalUser = 
                    {
                        id: interaction.user.id,
                        username: memObj.user.username,
                        avatar: userObj.avatar,
                        pkmnCaught: 1,
                        pkmnSeen: 1,
                        badges: 0,
                        money: 5000,
                        party: [userObj.party],
                        isInBattle: false,
                        battling: {}
                    };
                    console.log(finalUser);
                    await queries.insertUser(dbClient, interaction.user.id, finalUser);
                    userMap.set(userId, finalUser);
                    memObj.roles.add(await getRole(discordClient, "trainer"));
                    await messageHandler.deleteMessage(interaction, 1);

                }
            }

        });

        discordClient.login(token);

    }

}

module.exports = profBot;