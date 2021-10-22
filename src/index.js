const { Client, Intents } = require('discord.js');
const { token } = require('../config.json');
const bot = require('./bots/bot.js');

// instantiate client and intents
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS] });

bot.start(client, token);