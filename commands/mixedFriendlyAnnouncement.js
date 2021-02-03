const spacetime = require('spacetime');
const getTime = require('./getMatchTime');

var d = spacetime.now('Europe/London');
var s = d.add(7, 'day');
var time = getTime(3);
var newDate = `${s.dayName()} ${s.format('month')} ${s.format('{date-pad}')} at 20 UTC / ${time} EST`;

const getRole = require('./getRole');
const getChan = require('./getChannelId');

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
       
        await client.channels.cache.get(dftChan.id).send(embed).then(async function (message){
            await message.react('🦧');
        })

        client.on('messageReactionAdd', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (!reaction.message.guild) return;
        
            if (reaction.message.channel.id == dftChan.id) {
                if (reaction.emoji.name === '🦧'){
                    await reaction.message.guild.members.cache.get(user.id).roles.add(dtfRole.id);
                }else {
                    await reaction.remove();
                }
            }
        });

        client.on('messageReactionRemove', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (!reaction.message.guild) return;
            if (reaction.message.channel.id == dftChan.id) {
                if (reaction.emoji.name === '🦧'){
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(dtfRole.id);
                }
            }
        });

        if (!dftChan) return;

        await client.channels.cache.get(dftChan.id).send("<@&" + dtfRole.id + "> 🇪 🇺" + newDate + '\n' + 'React with a single unique emoji!' + '\n' + 'GROUP A')

        await client.channels.cache.get(dftChan.id).send("<@&" + dtfRole.id + "> 🇪 🇺" + newDate + '\n' + 'React with a single unique emoji!' + '\n' + 'GROUP B');

        await client.channels.cache.get(dftChan.id).send("<@&" + dtfRole.id + "> 🇳 🇦" + newDate + '\n' + 'React with a single unique emoji!' + '\n' + 'GROUP A')

        await client.channels.cache.get(dftChan.id).send("<@&" + dtfRole.id + "> 🇳 🇦" + newDate + '\n' + 'React with a single unique emoji!' + '\n' + 'GROUP B')
    }
}