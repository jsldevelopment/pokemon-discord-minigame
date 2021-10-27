module.exports = {

    getAllUsers: async function (client) {
        return await client.execute('SELECT * FROM members');
    },

    insertUser: async function (client, id, data) {
        const query = 'INSERT INTO members (id, data) VALUES (?, ?)';
        const params = [ parseInt(id), JSON.stringify(data) ];
        await client.execute(query, params, { prepare: true })
            .then(() => {
                console.log("success");
            });
    },

    getUser: async function (client, { id }) {
        const query = 'SELECT data FROM members WHERE id=?';
        const params = [ id ];
        const data = await client.execute(query, params, { prepare: true });
        return JSON.parse(data.rows[0].data);
    },
    
    insertPokemon: async function (client, { owner_id, pokemon_id, pokemon }) {
        const query = 'INSERT INTO pokemon (owner_id, id, data) VALUES (?, ?, ?)';
        const params = [ owner_id, pokemon_id, JSON.stringify(pokemon) ];
        await client.execute(query, params, { prepare: true });
    }

}
