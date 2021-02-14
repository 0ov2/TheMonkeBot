module.exports = {
    name: 'deletemxfchannels',
    async execute(message) {

        var generalVoice = message.guild.channels.cache.find(chan => chan.name == "pub-1");
        //EU
        if(!message.guild.channels.cache.find(cat=> cat.name == "🔵 🇪 🇺 BLUE 1")) {
            return;
        } else {
            var euGroupABlueChannel = message.guild.channels.cache.find(chan => chan.name == "🔵 🇪 🇺 BLUE 1");
            var mems = euGroupABlueChannel.members;
            if (mems.size == 0) {
                euGroupABlueChannel.delete();
            } else {
                mems.forEach(async user => {
                    await user.voice.setChannel(generalVoice);
                });
                await euGroupABlueChannel.delete();
            }
        }
        if(!message.guild.channels.cache.find(cat=> cat.name == "🟥 🇪 🇺 RED 1")) {
            return;
        } else {
            var euGroupARedChannel = message.guild.channels.cache.find(chan => chan.name == "🟥 🇪 🇺 RED 1");
            var mems = euGroupARedChannel.members;
            if (mems.size == 0) {
                euGroupARedChannel.delete();
            } else {
                mems.forEach(async user => {
                    await user.voice.setChannel(generalVoice);
                });
                await euGroupARedChannel.delete();
            }
        }
        if(!message.guild.channels.cache.find(cat=> cat.name == "🔵 🇪 🇺 BLUE 2")) {
            return;
        } else {
            var euGroupBBlueChannel = message.guild.channels.cache.find(chan => chan.name == "🔵 🇪 🇺 BLUE 2");
            var mems = euGroupBBlueChannel.members;
            if (mems.size == 0) {
                euGroupBBlueChannel.delete();
            } else {
                mems.forEach(async user => {
                    await user.voice.setChannel(generalVoice);
                });
                await euGroupBBlueChannel.delete();
            }
        }
        if(!message.guild.channels.cache.find(cat=> cat.name == "🟥 🇪 🇺 RED 2")) {
            return;
        } else {
            var euGroupBRedChannel = message.guild.channels.cache.find(chan => chan.name == "🟥 🇪 🇺 RED 2");
            var mems = euGroupBRedChannel.members;
            if (mems.size == 0) {
                euGroupBRedChannel.delete();
            } else {
                mems.forEach(async user => {
                    await user.voice.setChannel(generalVoice);
                });
                await euGroupBRedChannel.delete();
            }
        }

        //NA
        if(!message.guild.channels.cache.find(cat=> cat.name == "🔵 🇳 🇦 BLUE 1")) {
            return;
        } else {
            var naGroupABlueChannel = message.guild.channels.cache.find(chan => chan.name == "🔵 🇳 🇦 BLUE 1");
            var mems = naGroupABlueChannel.members;
            if (mems.size == 0) {
                naGroupABlueChannel.delete();
            } else {
                mems.forEach(async user => {
                    await user.voice.setChannel(generalVoice);
                });
                await naGroupABlueChannel.delete();
            }
        }
        if(!message.guild.channels.cache.find(cat=> cat.name == "🟥 🇳 🇦 RED 1")) {
            return;
        } else {
            var naGroupARedChannel = message.guild.channels.cache.find(chan => chan.name == "🟥 🇳 🇦 RED 1");
            var mems = naGroupARedChannel.members;
            if (mems.size == 0) {
                naGroupARedChannel.delete();
            } else {
                mems.forEach(async user => {
                    await user.voice.setChannel(generalVoice);
                });
                await naGroupARedChannel.delete();
            }
        }
        if(!message.guild.channels.cache.find(cat=> cat.name == "🔵 🇳 🇦 BLUE 2")) {
            return;
        } else {
            var naGroupBBlueChannel = message.guild.channels.cache.find(chan => chan.name == "🔵 🇳 🇦 BLUE 2");
            var mems = naGroupBBlueChannel.members;
            if (mems.size == 0) {
                naGroupBBlueChannel.delete();
            } else {
                mems.forEach(async user => {
                    await user.voice.setChannel(generalVoice);
                });
                await naGroupBBlueChannel.delete();
            }
        }
        if(!message.guild.channels.cache.find(cat=> cat.name == "🟥 🇳 🇦 RED 2")) {
            return;
        } else {
            var naGroupBRedChannel = message.guild.channels.cache.find(chan => chan.name == "🟥 🇳 🇦 RED 2");
            var mems = naGroupBRedChannel.members;
            if (mems.size == 0) {
                naGroupBRedChannel.delete();
            } else {
                mems.forEach(async user => {
                    await user.voice.setChannel(generalVoice);
                });
                await naGroupBRedChannel.delete();
            }
        }
    }
}