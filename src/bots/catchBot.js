const catchBot = {

    start: function(discordClient, dbClient, token, guild) {

        // discordClient.activeUsers = new Collection();
        // const userMap = discordClient.activeUsers;

        discordClient.once('ready', async () => {
            // const users = await queries.getAllUsers(dbClient);
            // // add each user to our map
            // users.rows.forEach((row) => {
            //     userMap.set(row.id, JSON.parse(row.data));
            //     console.log(JSON.parse(row.data));
            // })
            console.log(`catchBot: ready`);
        });

        discordClient.login(token);

    }

}

module.exports = catchBot;