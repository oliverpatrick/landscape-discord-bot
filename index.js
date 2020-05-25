const { CommandoClient } = require('discord.js-commando');
const path = require('path');
const client = new CommandoClient({
  commandPrefix: '!!',
  owner: [
    '226309085761503232', // - Oringe
    '153892440061902849', // - Sam
    '246307359259885570' // - Brian
  ]
});

require('dotenv').config()
const TOKEN = process.env.TOKEN;

client.login(TOKEN);

client.registry
  .registerDefaultTypes()
  .registerGroups([
    ['random', 'Random commands'],
    ['second', 'Your Second Command Group']
  ])
  .registerDefaultGroups()
  .registerDefaultCommands()
  .registerCommandsIn(path.join(__dirname, 'commands'));

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}! (${client.user.id})`);
  client.user.setActivity('Landscape Discord');
})

client.on('error', console.error);
