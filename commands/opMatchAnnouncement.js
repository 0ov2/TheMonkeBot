const spacetime = require('spacetime');

module.exports = {
    name: 'opMatchAnnouncement',
    async execute(client, chanid, opRole){  
                                               
        var d = spacetime.now('Europe/London');
        var s = d.add(7, 'day');
        var t = s.time('8:00pm');
        var newDate = ` Sunday ${s.format('{date-pad}')} ${s.format('month')} at <t:${t.epoch/1000}:t> vs DT`;
        
        client.channels.cache.get(chanid.id).send("<@&" + opRole + "> " + `${newDate}`).then(async function (message){
            await message.react('🦧');
        })
    }
}