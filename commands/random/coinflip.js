const { Command } = require('discord.js-commando');

module.exports = class CoinFlipCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'flip',
            group: 'random',
            memberName: 'coinflip',
            description: 'Flips a coin heads or tails?'
        })
    }

    run(message) {
        let coinflip = Math.floor(Math.random()*2) + 1;
        coinflip === 1 ? message.reply("Heads") : message.reply("Tails")
    }
};