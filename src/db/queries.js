module.exports = {
    insertUser: async function (client, { id, avatar, starter }) {
        const insert = 'INSERT INTO users (user_id, avatar, starter) VALUES (?,?,?)';
        const params = [ id, avatar, starter ];
        await client.execute(insert, params, { prepare: true });
        console.log('user added to db');
    },

    getUser: async function (client, id) {
        console.log(`querying on id ${id}`);
        var query = 'SELECT avatar FROM users WHERE user_id=?';
        const results = await client.execute(query, ["'" + id + "'"]);
        return results;
    }
}