const { Command } = require('discord.js-commando');

module.exports = class DiceRollCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'guild',
            group: 'serverinfo',
            memberName: 'guild',
            description: 'Size of the guild.'
        })
    }

    run(message) {
      return message.reply(e);
    }
};
