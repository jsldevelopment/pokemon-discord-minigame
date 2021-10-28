const { Client, Intents } = require('discord.js');
const cassandra = require('cassandra-driver');
const { profToken, catchToken, dbId, dbSecret, guildId } = require('../config.json');
const profBot = require('./bots/profBot.js');
const catchBot = require('./bots/catchBot.js');

// instantiate client and intents
const profClient = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS] });
const catchClient = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS] });
const dbClient = new cassandra.Client({
    cloud: { secureConnectBundle: './secure-connect-pokemon.zip' },
    credentials: { username: dbId, password: dbSecret},
    keyspace: 'data'
});

// start prof bot
profBot.start(profClient, dbClient, profToken, guildId);

// start catch bot
catchBot.start(catchClient, dbClient, catchToken, guildId);