const spacetime = require('spacetime');
const getTime = require('./getMatchTime');

var d = spacetime.now('Europe/London');
var s = d.add(6, 'day');
var time = getTime(4);
var newDate = ` Saturday ${s.format('{date-pad}')} ${s.format('month')} at 21 UTC / ${time} EST`;

const getRole = require('./getRole');
const getChan = require('./getChannelId');

module.exports = {
    name: 'dtfmessage',
    async execute(client, message){
        
        const dtfRole = getRole(client, 'dtf', message);
        const dftChan = getChan(client, 'dream-teams-friendly');

        client.channels.cache.get(dftChan.id).send("<@&" + dtfRole.id + "> 🇪 🇺" + newDate + '\n' + 'React with a single unique emoji ' + '**if you are an EU player!**').then(async function (Message) {
            client.on('messageReactionAdd', async (reaction, user) => {
                if (reaction.message.partial) await reaction.message.fetch();
                if (reaction.partial) await reaction.fetch();
                if (!reaction.message.guild) return;
            
                // if (reaction.message.channel.id == dftChan.id && reaction.message.id == Message.id) {
                //     if (reaction.message.reactions.cache.get(reaction._emoji.name).count > 1) {
                //         await reaction.message.reactions.resolve(reaction._emoji.name).users.remove(user.id);
                //     }
                // }
            });
        })

        client.channels.cache.get(dftChan.id).send("<@&" + dtfRole.id + "> 🇳 🇦" + newDate + '\n' + 'React with a single unique emoji ' + '**if you are an NA player!**').then(async function (Message) {
            client.on('messageReactionAdd', async (reaction, user) => {
                if (reaction.message.partial) await reaction.message.fetch();
                if (reaction.partial) await reaction.fetch();
                if (!reaction.message.guild) return;
            
                // if (reaction.message.channel.id == dftChan.id && reaction.message.id == Message.id) {
                //     if (reaction.message.reactions.cache.get(reaction._emoji.name).count > 1) {
                //         await reaction.message.reactions.resolve(reaction._emoji.name).users.remove(user.id);
                //     }
                // }
            });
        })
    }
}