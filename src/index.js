const { Client, Intents } = require('discord.js');
const { token, dbId, dbSecret, guildId } = require('../config.json');
const cassandra = require('cassandra-driver');
const bot = require('./bots/bot.js');
const userMap = require('./objects/userMap');
const { getUsers, updateDB } = require('./db/queries');

const dbClient = new cassandra.Client({
    cloud: { secureConnectBundle: './<datastax-connection-file>.zip' },
    credentials: { username: "<clientId>", password: "clientSecret" },
    keyspace: '<keyspace name>'
});

(async() => {

    // update local map with db
    getUsers()
        .then((users) => {
            users.forEach((user) => {
                userMap.set(user.id, user);
            });
        })

    // sync db with current local storage
    setInterval(() => {
        const newData = [];
        userMap.forEach((val, key, map) => {
            newData.push(val);
        })
        updateDB(newData);
    }, 30000);

    // instantiate the bot client
    // add any necessary intents here
    const botClient = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS] });

    // start bot with a reference to the bot, the db, and tokens
    bot.start(botClient, dbClient, token, guildId);

})();