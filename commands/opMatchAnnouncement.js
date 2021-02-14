var fs = require('fs');

module.exports = {
    name: 'opMatchAnnouncement',
    async execute(client, chanid, opRole){  
                                               
        client.channels.cache.get(chanid.id).send("<@&" + opRole + "> Sunday 20 UTC vs DT ").then(async function (message){
            await message.react('🦧');

            var options = {encoding: 'utf-8', flag: 'w'};
            await fs.writeFileSync('./messageIDs/opMatchAnnouncementID.txt', message.id, options);
        })
    }
}