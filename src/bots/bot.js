const messageHandler = require('../handlers/MessageHandler.js');
const messages = require('../data/messages.js');
const queries = require('../db/queries.js');
const { default: Collection } = require('@discordjs/collection');
const uuid = require('uuid').v4;

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
                    const result = await queries.getUser(dbClient, interaction.user.id);
                    await interaction.editReply({ content: JSON.stringify(result) });
                }

            } else if (interaction.isMessageComponent()) {
                    
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
                        let member = await getMember(interaction.user.id);
                        member.roles.add(await getRole("trainer"));
                        await messageHandler.deleteMessage(interaction, 1);
                        break;

                }
            }

        });

        discordClient.login(token);


        getGuild = async function() {

            if(!discordClient) return;

            return await discordClient.guilds.cache.get(guild);

        },
    
        getMember = async function(id) {
            
            if (!discordClient) return;
            
            const guild = await getGuild();
            let member = await guild.members.fetch(id);
            return member;

        },

        getRole = async function(roleId) {

            if (!discordClient) return;

            const guild = await getGuild();
            return await guild.roles.cache.find(role => role.name === roleId);
            
        },

        generatePokemon = async function(rawPokemon) {

            console.log(`generating new pokemon from ${JSON.stringify(rawPokemon)}`);
            const newPokemon = {};
            // every generated pokemon recieves a uuid
            newPokemon.uuid = uuid();
            // values taken directly from raw
            newPokemon.id = rawPokemon.id;
            newPokemon.name = rawPokemon.name;
            newPokemon.types = rawPokemon.types;
            // values generated based on raw
            newPokemon.gender = Math.floor(Math.random() * 101) < rawPokemon.genderRatio ? 1 : 0;
            newPokemon.ability =  Math.floor(Math.random() * 101) < rawPokemon.abilities.abilityRatio ? rawPokemon.abilities.ability1 : rawPokemon.abilities.ability2;
            console.log(JSON.stringify(newPokemon));
            return newPokemon;

        }
        
    }

}

module.exports = bot;