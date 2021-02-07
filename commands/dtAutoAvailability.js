var GetMatchTime = require("./getMatchTime");
var fs = require('fs');
module.exports = {
    name: 'dtAutoAvailability',
    async execute(client, chanid, dreamRole){   
        var matchTimeEu = GetMatchTime(3);
        var matchTimeNa = GetMatchTime(8); 
        
        await client.channels.cache.get(chanid).send("<@&" + dreamRole + ">\n" + 
        `A - Monday night ${matchTimeNa} ish \n` +
        `B - Tuesday night ${matchTimeNa} ish \n` +
        `C - Wednesday night ${matchTimeNa} ish \n` +
        `D - Thursday night ${matchTimeNa} ish \n` +
        `E - Friday night ${matchTimeNa} ish \n` +
        `F - Saturday afternoon ${matchTimeEu} ish \n` +
        `G - Saturday night ${matchTimeNa} ish \n` +
        `H - Sunday afternoon ${matchTimeEu} ish \n` +
        `I - Sunday night ${matchTimeNa} ish`).then(async function (message){
            await message.react('🇦'),
            await message.react('🇧'),
            await message.react('🇨'),
            await message.react('🇩'),
            await message.react('🇪'),
            await message.react('🇫'),
            await message.react('🇬'),
            await message.react('🇭'),
            await message.react('🇮');

        var options = {encoding: 'utf-8', flag: 'w'};
        fs.writeFileSync('./dtAvailabilityMessage.txt', message.id, options);

        })
    }
}