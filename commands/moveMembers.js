module.exports = {
    name: 'movemembers',
    async execute(message) {

        var generalVoice = message.guild.channels.cache.find(chan => chan.name == "fam-2 (Hidden)");
        
        // moves all user in specific channel
        if(!message.guild.channels.cache.find(cat=> cat.name == "octane")) {
            return;
        } else {
            try {
                var octaneVC = message.guild.channels.cache.find(chan => chan.name == "octane");
                var mems = octaneVC.members;
                if (mems.size == 0) {
                    message.reply('No one is there to move!')
                } else {
                    mems.forEach(async user => { // loops through the users currently in the voice channel
                        await user.voice.setChannel(generalVoice); // moves user to different channel
                    });
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
}