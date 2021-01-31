var today = new Date();
today.setDate(today.getDate() + 7);
var dd = String(today.getDay() + 7);
var mm = String(today.getMonth() + 1);
var yy = String(today.getFullYear());
var newDate = dd + '.' + mm + '.' + yy;

module.exports = {
    name: 'mixedFriendlyAnnouncement',
    async execute(client, Discord, mxfChan, mxfRole){
        
        // role claim
        let embed = new Discord.MessageEmbed()
        .setTitle('React to get pinged!')
        .setColor("ORANGE")
        .setDescription('🦧 - MXF') //
       
        await client.channels.cache.get(mxfChan.id).send(embed).then(function (message){
            message.react('🦧');
        })

        client.on('messageReactionAdd', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (!reaction.message.guild) return;
        
            if (reaction.message.channel.id == mxfChan.id) {
                if (reaction.emoji.name === '🦧'){
                    await reaction.message.guild.members.cache.get(user.id).roles.add(mxfChan);
                }else {
                    reaction.remove();
                }
            }
        });

        client.on('messageReactionRemove', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (!reaction.message.guild) return;
            if (reaction.message.channel.id == mxfChan) {
                if (reaction.emoji.name === '🦧'){
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(mxfChan);
                }
            }
        });

        if (!mxfChan) return;

        await client.channels.cache.get(mxfChan.id).send("<@&" + mxfRole.id + "> Saturday " + newDate + ' - 20 UTC / 21 CEST / 15 EST.' + '\n' + 'React with a single unique emoji!' + '\n' + 'GROUP A')

        await client.channels.cache.get(mxfChan.id).send("<@&" + mxfRole.id + "> Saturday " + newDate + ' - 20 UTC / 21 CEST / 15 EST.' + '\n' + 'React with a single unique emoji!' + '\n' + 'GROUP B');
    }
}