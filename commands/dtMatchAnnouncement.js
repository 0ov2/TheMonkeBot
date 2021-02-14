var GetMatchTime = require("./getMatchTime");
var fs = require('fs');

module.exports = {
    name: 'dtMatchAnnouncement',
    async execute(client, chanid, dreamRole){
        var matchTime = GetMatchTime(3);

        await client.channels.cache.get(chanid.id).send("<@&" + dreamRole + ">" + ` Sunday ${matchTime} vs OP`).then(async function (message){
            await message.react('🦧');

            var options = {encoding: 'utf-8', flag: 'w'};
            await fs.writeFileSync('./messageIDs/dtMatchAnnouncementID.txt', message.id, options);
        })
    }
}