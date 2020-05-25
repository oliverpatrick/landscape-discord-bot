const { Command } = require('discord.js-commando');

module.exports = class DiceRollCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'roll',
            group: 'random',
            memberName: 'diceroll',
            description: 'Rolls a die',
            throttling: {
              usages: 6,
              duration: 60
            },
        })
    }

    run(message) {
      let roll = Math.floor(Math.random()*6) + 1;
      message.reply(`You rolled a ${roll}`);
    }
};