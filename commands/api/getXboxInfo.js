const { Command } = require('discord.js-commando');
const moment = require('moment')
const Discord = require('discord.js');
const fetch = require("node-fetch");
require('dotenv').config()


module.exports = class getXboxInfoCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'xbox',
      group: 'api',
      memberName: 'xbox',
      description: 'Get weather report.',
      args: [
        {
          key: 'tag',
          prompt: 'Please enter the gamertag',
          type: 'string',
        }
      ]
    })
  }
}