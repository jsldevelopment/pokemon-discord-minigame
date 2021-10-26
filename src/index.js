const { Client, Intents } = require('discord.js');
const cassandra = require('cassandra-driver');
const { token, dbId, dbSecret, guildId } = require('../config.json');
const bot = require('./bots/bot.js');

// instantiate client and intents
const discordClient = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS] });
const dbClient = new cassandra.Client({
    cloud: { secureConnectBundle: './db-connection.zip' },
    credentials: { username: dbId, password: dbSecret},
    keyspace: 'pokemonapp'
});

// start bot 1
bot.start(discordClient, dbClient, token, guildId);