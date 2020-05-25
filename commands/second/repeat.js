const { Command } = require('discord.js-commando');

module.exports = class DiceRollCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'repeat',
            group: 'second',
            memberName: 'repeat',
            description: 'Replies with the text you provide.',
            args: [
                {
                    key: 'text',
                    prompt: 'What text would you like the bot to say?',
                    type: 'string'
                }
            ]
        })
    }

    run(message, { text }) {
      return message.reply(text);
    }
};