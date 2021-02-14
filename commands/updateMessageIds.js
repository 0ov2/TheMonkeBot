var fs = require('fs');

async function updateMessageIds(client) {
    //DTF role claim
    var dtfmessage = await client.channels.cache.find(chan => chan.name == 'dream-teams-friendly');
    var messages = await dtfmessage.messages.fetch();
    var embed = messages.find(msg => msg.content == '' && msg.author.bot == true);

    var options = {encoding: 'utf-8', flag: 'w'};
    fs.writeFileSync('./messageIDs/roleClaimMessage.txt', embed.id, options);
}

module.exports = updateMessageIds;
