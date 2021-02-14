const getChan = require('./getChannelId');
const fs = require('fs');

module.exports = {
    name: 'mixedFriendlyAnnouncement',
    async execute(client, Discord, message){
        
        const dftChan = getChan(client, 'dream-teams-friendly');

        // role claim
        let embed = new Discord.MessageEmbed()
        .setTitle('React to get pinged!')
        .setColor("ORANGE")
        .setDescription('🦧 - Dream Team Friendly') //
       
        client.channels.cache.get(dftChan.id).send(embed).then(async function (message){
            await message.react('🦧');

            var options = {encoding: 'utf-8', flag: 'w'};
            fs.writeFileSync('./messageIDs/roleClaimMessage.txt', message.id, options);
        })
    }
}