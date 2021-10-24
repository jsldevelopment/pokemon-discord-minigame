module.exports = {

    insertUser: async function (client, { id, avatar, starter }) {
        const query = 'INSERT INTO users (id, data) VALUES (?, ?)';
        const params = [ id, JSON.stringify({ "avatar": avatar, "starter": starter }) ];
        await client.execute(query, params, { prepare: true });
        console.log(`user added to db ${id}`);
    },

    getUserString: function(id, data) {
        return ;
    }
}
