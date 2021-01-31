var getChannelId = require("./getChannelId.js");


var today = new Date();
today.setDate(today.getDate() + 7);
var dd = String(today.getDay() + 7);
var mm = String(today.getMonth() + 1);
var yy = String(today.getFullYear());
var newDate = dd + '.' + mm + '.' + yy;

module.exports = {
    name: 'mixedFriendlyAnnouncement',
    async execute(client, Discord, roleId){
        var mxfChan = getChannelId(client, 'mxf-general')

        // role claim
        let embed = new Discord.MessageEmbed()
        .setTitle('React to get pinged!')
        .setColor("ORANGE")
        .setDescription('🦧 - MXF')
       
        await client.channels.cache.get(mxfChan.id).send(embed).then(function (message){
            message.react('🦧');
        })

        client.on('messageReactionAdd', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;
        
            if (reaction.message.channel.id == mxfChan.id) {
                if (reaction.emoji.name === '🦧'){
                    await reaction.message.guild.members.cache.get(user.id).roles.add(roleId.id);
                }
            }
        });

        client.on('messageReactionRemove', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;
            if (reaction.message.channel.id == mxfChan.id) {
                if (reaction.emoji.name === '🦧'){
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(roleId.id);
                }
            }
        });

        if (!mxfChan) return;

        await client.channels.cache.get(mxfChan.id).send("<@&" + "803449090300968971" + "> Saturday " + newDate + ' - 19 UTC / 20 CEST / 14 EST.' + '\n' + 'React with a single unique emoji!' + '\n' + 'GROUP A')

        await client.channels.cache.get(mxfChan.id).send("<@&" + "803449090300968971" + "> Saturday " + newDate + ' - 19 UTC / 20 CEST / 14 EST.' + '\n' + 'React with a single unique emoji!' + '\n' + 'GROUP B');
    }
}