const insertUser = async function (client, { id, avatar, starter }) {
    const insert = 'INSERT INTO users (user_id, avatar, starter) VALUES (?,?,?)';
    const params = [ id, avatar, starter ];
    await client.execute(insert, params, { prepare: true });
    console.log('user added to db');
}

module.exports = insertUser;