#Usage
# Discord Bot Template

<img src="./img/warning.png" alt="drawing" width="50"/> ***HEAVILY WIP (DO NOT CLONE UNLESS YOU KNOW WHAT YOU'RE DOING)*** <img src="./img/warning.png" alt="drawing" width="50"/>

---------------------------------------

## Connecting the bot to [Discord](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot):

```js
const { Client, Intents } = require('discord.js');
const { token, dbId, dbSecret, guildId } = require('../config.json');
```

1. Instantiate your bot Client with all necessary [Intents](https://discord.com/developers/docs/topics/gateway) -

```js 
const botClient = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS] });
```

2. Inside of our bot's start() function, login using your token

```js
discordClient.login(token);
```

3. Once the webhook handshake is complete, your bot's 'ready' event will trigger --

```js
discordClient.once('ready', async () => {
    console.log(`bot is ready to serve`);
});
```

## Connecting the bot to [Cassandara via NodeJS](https://docs.datastax.com/en/astra/docs/connecting-to-your-database-with-the-datastax-nodejs-driver.html):

```js 
const cassandra = require('cassandra-driver');
```

1. **\<datastax-connection-file\>** corresponds to the secure-connection-zip you download after creating your DataStax Astra Cassandra database.
2. **\<clientId\>** & **\<clientSecret\>** refer to your authorization tokens.
3. **\<keyspace-name\>** refers to the [Keyspace](https://www.tutorialspoint.com/cassandra/cassandra_create_keyspace.htm) created within your DB.

```js
const dbClient = new cassandra.Client({
    cloud: { secureConnectBundle: './<datastax-connection-file>.zip' },
    credentials: { username: "<clientId>", password: "clientSecret"},
    keyspace: '<keyspace name>'
});
```

## Registering Slash Commands

Slash Commands are registered using the deploy-commands.js script.

This command can be ran independently using ```npm run commands``` or alongside a test build using ```npm run deploy```.