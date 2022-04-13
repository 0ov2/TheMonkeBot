module.exports = {
    name: 'autoAvailability',
    async execute(client, ChanID, opRole){
        await client.channels.cache.get(ChanID.id).send("<@&" + opRole + ">\n" + //
        'A - Monday 18 UTC \n' +
        'B - Tuesday 18 UTC \n' +
        'C - Wednesday 18 UTC \n' +
        'D - Thursday 18 UTC \n' +
        'E - Friday 18 UTC \n' +
        'F - Saturday 18 UTC \n' +
        'G - Sunday 18 UTC').then(async function (message){
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

