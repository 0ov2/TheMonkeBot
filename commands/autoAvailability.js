const spacetime = require('spacetime');

module.exports = {
    name: 'autoAvailability',
    async execute(client, ChanID, opRole){
        let epochArray = [];
        let spaceTimeDate = spacetime().time('6:00pm').goto('Europe/London');

        for (let i = 1; i < 8; i++){
            let date = spaceTimeDate.add(i, 'day');
            epochArray.push({'epoch': date.epoch / 1000, 'day': date.format('day')});
            console.log({'epoch': date.epoch / 1000, 'day': date.format('day')});
        }

        await client.channels.cache.get(ChanID.id).send("<@&" + opRole + ">\n" +
        `A - ${epochArray[0].day} <t:${epochArray[0].epoch}:t> \n` +
        `B - ${epochArray[1].day} <t:${epochArray[1].epoch}:t> \n` +
        `C - ${epochArray[2].day} <t:${epochArray[2].epoch}:t> \n` +
        `D - ${epochArray[3].day} <t:${epochArray[3].epoch}:t> \n` +
        `E - ${epochArray[4].day} <t:${epochArray[4].epoch}:t> \n` +
        `F - ${epochArray[5].day} <t:${epochArray[5].epoch}:t> \n` +
        `G - ${epochArray[6].day} <t:${epochArray[6].epoch}:t>`).then(async (message) => {
            await message.react('🇦'),
            await message.react('🇧'),
            await message.react('🇨'),
            await message.react('🇩'),
            await message.react('🇪'),
            await message.react('🇫'),
            await message.react('🇬');
        })
    }
}