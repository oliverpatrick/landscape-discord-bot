const { Command } = require('discord.js-commando');

module.exports = class DiceRollCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'yorno',
            group: 'serverinfo',
            memberName: 'yesorno',
            description: 'Gives you the option of yes or no',
            args: [
                {
                    key: 'option',
                    prompt: 'Yes or No?',
                    type: 'string',
                    oneOf: ['yes', 'no']
                }
            ]
        })
    }

    run(message, { option }) {
      return message.reply(option);
    }
};