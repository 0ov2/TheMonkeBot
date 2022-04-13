module.exports = {
    name: 'autoAvailability',
    async execute(client, ChanID, opRole){
        let epochArray = [];
        
        for (let i = 1; i < 8; i++){
            let date = new Date();
            date.setDate(date.getDate() + i)
            date.setHours(19);
            date.setMinutes(0);
            date.setSeconds(0);
            date.setMilliseconds(0);
            epochArray.push({'epoch': date / 1000, 'day': new Intl.DateTimeFormat('en-US', {weekday: 'long'}).format(date)});
        }

        await client.channels.cache.get(ChanID.id).send("<@&" + opRole + ">\n" + //
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

