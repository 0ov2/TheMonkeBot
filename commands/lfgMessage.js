const fs = require('fs');
var getRole = require('./getRole');
var getChannel = require('./getChannelId');
module.exports = {
    name: 'lfgmessage',
    async execute(client, Discord, chan){
        var everyoneRole = getRole(client, '@everyone');
        var lfgChan = getChannel(client, 'looking-for-gamers')

        // role claim
        let embed = new Discord.MessageEmbed()
        .setTitle('Roles')
        .setColor("ORANGE")
        .setDescription('🍆 - Pavlov \n' + '💦 - Population One')

        await chan.send(everyoneRole.name +` Please react to the emotes below to get the Pavlov LFG and Pop1 LFG roles which will be used in <#${lfgChan.id}> when people want to find others to play with!`);

        client.channels.cache.get(chan.id).send(embed).then(async function (message){
            await message.react('🍆');
            await message.react('💦');

            var options = {encoding: 'utf-8', flag: 'w'};
            fs.writeFileSync('./messageIDs/lfgMessageId.txt', message.id, options);
        })
    }
}