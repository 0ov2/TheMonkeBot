const getChan = require('./getChannelId');

module.exports = {
    name: 'mixedFriendlyAnnouncement',
    async execute(client, Discord){
        
        const dftChan = getChan(client, 'dream-teams-friendly');

        // role claim
        let embed = new Discord.MessageEmbed()
        .setTitle('React to get pinged (if you don\'t have the DTF role already)!')
        .setColor("ORANGE")
        .setDescription('🦧 - Dream Team Friendly') //
       
        client.channels.cache.get(dftChan.id).send(embed).then(async function (message){
            await message.react('🦧');
        })
    }
}