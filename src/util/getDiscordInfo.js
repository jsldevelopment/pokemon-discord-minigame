const { guildId } = require('../../config.json');

module.exports = {

    getGuild: async function(client) {

        if(!client) return;
        return await client.guilds.cache.get(guildId);

    },
    
    getMember: async function(client, id) {
        
        if(!client) return;
        return member = await client.guilds.cache.get(guildId).members.fetch(id);

    },

    getRole: async function(client, roleId) {

        if(!client) return;
        return await client.guilds.cache.get(guildId).roles.cache.find(role => role.name === roleId);
        
    }
}
        