module.exports = {

    insertUser: async function (client, { id, avatar, party }) {
        const query = 'INSERT INTO users (id, data) VALUES (?, ?)';
        const params = [ id, JSON.stringify({ "avatar": avatar, "party": party }) ];
        await client.execute(query, params, { prepare: true });
        console.log(`user added to db ${id}`);
    },

    insertPokemon: async function (client, { id, avatar, party }) {
        const query = 'INSERT INTO users (id, data) VALUES (?, ?)';
        const params = [ id, JSON.stringify({ "avatar": avatar, "party": party }) ];
        await client.execute(query, params, { prepare: true });
        console.log(`user added to db ${id}`);
    },

    getRawPokemon: async function (client, { id }) {
        console.log(`grabbing starter id ${id} from db`);
        const query = 'SELECT data FROM pokemon_raw WHERE id=?';
        const params = [ id ];
        const data = await client.execute(query, params, { prepare: true });
        return data.rows[0].data;
    }

}
