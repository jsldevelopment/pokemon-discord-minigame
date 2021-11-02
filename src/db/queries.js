module.exports = {

    getFromDB: async function (client) {
        return await client.execute('SELECT * FROM table');
    }

}
