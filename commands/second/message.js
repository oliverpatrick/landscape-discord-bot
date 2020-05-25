const { Command } = require('discord.js-commando');

module.exports = class DiceRollCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'guild',
            group: 'second',
            memberName: 'guild',
            description: 'Size of the guild.'
        })
    }

    run(message) {
      return message.reply(this.client.guilds.cache.size);
    }
};

//???? guild what is it?
