const fs = require('fs');
const getRole = require('./getRole');

module.exports = {
    name: 'roleClaimMessageReaction',
    async execute(client){

        const getChannelId = require('./getChannelId');

        var dftChan = getChannelId(client, 'dream-teams-friendly');

        client.on('messageReactionAdd', async (reaction, user) => {
            var options = {encoding: 'utf-8', flag: 'r'};
            var messageId = fs.readFileSync('./roleClaimMessage.txt', options);
    
            if (reaction.partial) {
                try {
                    await reaction.fetch();
                } catch (error) {
                    console.error('Something went wrong when fetching the message: ', error);
                    return;
                }
            } else if (reaction.message.channel.id == dftChan.id && reaction.message.id == messageId) {
                dtfRole = getRole(client, 'dtf', '', reaction);
                if (reaction.emoji.name === '🦧'){
                    await reaction.message.guild.members.cache.get(user.id).roles.add(dtfRole.id);
                }
            }
        });
    
        client.on('messageReactionRemove', async (reaction, user) => {
            var options = {encoding: 'utf-8', flag: 'r'};
            var messageId = fs.readFileSync('./roleClaimMessage.txt', options);
    
            if (reaction.partial) {
                try {
                    await reaction.fetch();
                } catch (error) {
                    console.error('Something went wrong when fetching the message: ', error);
                    return;
                }
            } else if (reaction.message.channel.id == dftChan.id && reaction.message.id == messageId) {
                dtfRole = getRole(client, 'dtf', '', reaction);
                if (reaction.emoji.name === '🦧'){
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(dtfRole.id);
                }
            }
        });
    }
}