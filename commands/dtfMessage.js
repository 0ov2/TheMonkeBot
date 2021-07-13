const spacetime = require('spacetime');
//const getTime = require('./getMatchTime');
const getRole = require('./getRole');
const getChan = require('./getChannelId');

module.exports = {
    name: 'dtfmessage',
    async execute(client, message){
        var d = spacetime.now('Europe/London');
        var s = d.add(6, 'day');
        // var time = getTime(4);
        var newDate = ` Saturday ${s.format('{date-pad}')} ${s.format('month')} at 20 UTC / 4pm EST`;
        
        const dtfRole = getRole(client, 'dtf', message);
        const dftChan = getChan(client, 'dream-teams-friendly');

        client.channels.cache.get(dftChan.id).send("<@&" + dtfRole.id + ">" + ':regional_indicator_e: :regional_indicator_u: ' + newDate + '\n' + 'React with a single unique emoji ' + '**if you are an EU player!**');

        client.channels.cache.get(dftChan.id).send("<@&" + dtfRole.id + ">" + ':regional_indicator_n: :regional_indicator_a:' + newDate + '\n' + 'React with a single unique emoji ' + '**if you are an NA player!**');
    }
}