module.exports = {

    getGuild: async function(client) {

        if(!client) return;

        return await client.guilds.cache.get(guild);

    },

    getMember: async function(client, id) {
        
        const guild = await getGuild(client);
        let member = await guild.members.fetch(id);
        return member;

    },

    getRole: async function(client, roleId) {

        const guild = await getGuild(client);
        return await guild.roles.cache.find(role => role.name === roleId);
        
    }
}
        