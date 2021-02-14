var fs = require('fs');
module.exports = {
    name: 'autoAvailability',
    async execute(client, ChanID, opRole){
        await client.channels.cache.get(ChanID.id).send("<@&" + opRole + ">\n" + //
        'A - Monday 19 UTC \n' +
        'B - Tuesday 19 UTC \n' +
        'C - Wednesday 19 UTC \n' +
        'D - Thursday 19 UTC \n' +
        'E - Friday 19 UTC \n' +
        'F - Saturday 19 UTC \n' +
        'G - Sunday 19 UTC').then(async function (message){
            await message.react('🇦'),
            await message.react('🇧'),
            await message.react('🇨'),
            await message.react('🇩'),
            await message.react('🇪'),
            await message.react('🇫'),
            await message.react('🇬');
            
        var options = {encoding: 'utf-8', flag: 'w'};
        fs.writeFileSync('./messageIDs/opAvailabilityMessage.txt', message.id, options);

        })
    }
}

