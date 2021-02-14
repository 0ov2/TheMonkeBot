var fs = require('fs');

async function updateMessageIds(client) {

    var dtfmessage = await client.channels.cache.find(chan => chan.name == 'dream-teams-friendly');
    var messages = await dtfmessage.messages.fetch();

    var embed = messages.find(msg => msg.contents == '');

    console.log(messages.for);
}

module.exports = updateMessageIds;
