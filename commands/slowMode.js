const commando = require('discord.js-commando')

module.exports = {
    name: 'slowmode',
    execute(message, args) {
        const {channel} = message
        if (message.member.id === "259466508814516224" || message.member.id === "598203336868495360" || message.member.id === "396839144837349376" || message.member.id === "278724509534519297" || message.member.id === "246687193899204608" || message.member.id === "392933270779854848" || message.member.id === "339237828053565450"){

            let duration = args;
            if (duration === 'off') {
                duration = 0
            }
    
            if (isNaN(duration)) {
                message.reply('Please provide either a number of seconds or the word "off"')
                return
            }

            channel.setRateLimitPerUser(parseInt(duration))
        }else {
            return;
        }
    }
}