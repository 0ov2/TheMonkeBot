const commando = require('discord.js-commando')

module.exports = {
    name: 'slowmode',
    execute(message, args) {
        const {channel} = message
        
        let duration = args;
        if (duration === 'off') {
            duration = 0
        }

        if (isNaN(duration)) {
            message.reply('Please provide either a number of seconds or the word "off"')
            return
        }

        channel.setRateLimitPerUser(parseInt(duration))
    }
}