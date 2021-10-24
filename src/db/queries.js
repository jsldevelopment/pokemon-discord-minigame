module.exports = {

    insertUser: async function (client, { id, avatar, starter }) {
        const query = 'INSERT INTO users (id, data) VALUES (?, ?)';
        const params = [ id, JSON.stringify({ "avatar": avatar, "starter": starter }) ];
        await client.execute(query, params, { prepare: true });
        console.log(`user added to db ${id}`);
    },

    insertPokemon: async function (client, { id, avatar, starter }) {
        const query = 'INSERT INTO users (id, data) VALUES (?, ?)';
        const params = [ id, JSON.stringify({ "avatar": avatar, "starter": starter }) ];
        await client.execute(query, params, { prepare: true });
        console.log(`user added to db ${id}`);
    },

    getRawPokemon: async function (client, { id }) {
        console.log(`grabbing starter id ${id} from db`);
        const query = 'SELECT data FROM pokemon_raw WHERE id=?';
        const params = [ id ];
        await client.execute(query, params, { prepare: true }, (err, res) => {
            console.log(`starter grabbed from db ${JSON.stringify(res.rows[0].data)}`);
            return res.rows[0].data;
        });
    }

}
