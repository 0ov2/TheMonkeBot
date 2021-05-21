var fs = require('fs');
const spacetime = require('spacetime');


module.exports = {
    name: 'opMatchAnnouncement',
    async execute(client, chanid, opRole){  
                                               
        var d = spacetime.now('Europe/London');
        var s = d.add(7, 'day');
        var newDate = ` Sunday ${s.format('{date-pad}')} ${s.format('month')} at 19 UTC vs DT`;
        
        client.channels.cache.get(chanid.id).send("<@&" + opRole + "> " + `${newDate}`).then(async function (message){
            await message.react('🦧');

            var options = {encoding: 'utf-8', flag: 'w'};
            await fs.writeFileSync('./messageIDs/opMatchAnnouncementID.txt', message.id, options);
        })
    }
}