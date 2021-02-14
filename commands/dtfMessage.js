const spacetime = require('spacetime');
const getTime = require('./getMatchTime');
const fs = require('fs');

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
            
            var options = {encoding: 'utf-8', flag: 'w'};
            fs.writeFileSync('./messageIDs/euDtfMessageId.txt', Message.id, options);
        })

        client.channels.cache.get(dftChan.id).send("<@&" + dtfRole.id + "> 🇳 🇦" + newDate + '\n' + 'React with a single unique emoji ' + '**if you are an NA player!**').then(async function (Message) {
            
            var options = {encoding: 'utf-8', flag: 'w'};
            fs.writeFileSync('./messageIDs/naDtfMessageId.txt', Message.id, options);
        })
    }
}