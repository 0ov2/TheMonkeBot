const getRole = require('./getRole');
const getChan = require('./getChannelId');
const fs = require('fs');

module.exports = {
    name: 'mixedFriendlyAnnouncement',
    async execute(client, Discord, message){
        
        const dtfRole = getRole(client, 'dtf', message);
        const dftChan = getChan(client, 'dream-teams-friendly');

        // role claim
        let embed = new Discord.MessageEmbed()
        .setTitle('React to get pinged!')
        .setColor("ORANGE")
        .setDescription('🦧 - Dream Team Friendly') //
       
        client.channels.cache.get(dftChan.id).send(embed).then(async function (message){
            await message.react('🦧');

            var options = {encoding: 'utf-8', flag: 'w'};
            fs.writeFileSync('./roleClaimMessage.txt', message.id, options);

            client.on('messageReactionAdd', async (reaction, user) => {
                if (reaction.message.partial) await reaction.message.fetch();
                if (reaction.partial) await reaction.fetch();
                if (!reaction.message.guild) return;
            
                if (reaction.message.channel.id == dftChan.id && reaction.message.id == message.id) {
                    if (reaction.emoji.name === '🦧'){
                        await reaction.message.guild.members.cache.get(user.id).roles.add(dtfRole.id);
                    }
                }
            });
    
            client.on('messageReactionRemove', async (reaction, user) => {
                if (reaction.message.partial) await reaction.message.fetch();
                if (reaction.partial) await reaction.fetch();
                if (!reaction.message.guild) return;
                if (reaction.message.channel.id == dftChan.id && reaction.message.id == message.id) {
                    if (reaction.emoji.name === '🦧'){
                        await reaction.message.guild.members.cache.get(user.id).roles.remove(dtfRole.id);
                    }
                }
            });
        })
    }
}