module.exports = {

    insertUser: async function (client, { id, avatar, party }) {
        const query = 'INSERT INTO users (id, data) VALUES (?, ?)';
        const params = [ id, JSON.stringify({ "avatar": avatar, "party": [party] }) ];
        await client.execute(query, params, { prepare: true });
    },

    getUser: async function (client, { id }) {
        const query = 'SELECT data FROM users WHERE id=?';
        const params = [ id ];
        const data = await client.execute(query, params, { prepare: true });
        return JSON.parse(data.rows[0].data);
    },

    insertPokemon: async function (client, { owner_id, pokemon_id, pokemon }) {
        const query = 'INSERT INTO pokemon (owner_id, id, data) VALUES (?, ?, ?)';
        const params = [ owner_id, pokemon_id, JSON.stringify(pokemon) ];
        await client.execute(query, params, { prepare: true });
    },

    getRawPokemon: async function (client, { id }) {
        const query = 'SELECT data FROM pokemon_raw WHERE id=?';
        const params = [ id ];
        const data = await client.execute(query, params, { prepare: true });
        return data.rows[0].data;
    }

}
