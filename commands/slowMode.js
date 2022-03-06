module.exports = {
    name: 'slowmode',
    execute(message, args) {
        const {channel} = message
        
        let duration = args;
        if (duration === 'off') {
            duration = 0
        }
        
        try {
            if (duration == 10) {
                channel.setRateLimitPerUser(parseInt(600));
            } else if (isNaN(duration)) {
                return message.reply('Please provide either a number of seconds or the word "off"')
            } else {
                channel.setRateLimitPerUser(parseInt(duration));
            }
        } catch (error) {
            console.log(error);
        }
    }
}