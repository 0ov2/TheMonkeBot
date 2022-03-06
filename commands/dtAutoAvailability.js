module.exports = {
    name: 'dtAutoAvailability',
    async execute(client, chanid, dreamRole){   
        
        await client.channels.cache.get(chanid.id).send("<@&" + dreamRole + ">\n" + 
        `A - Monday night 8pm ish \n` +
        `B - Tuesday night 8pm ish \n` +
        `C - Wednesday night 8pm ish \n` +
        `D - Thursday night 8pm ish \n` +
        `E - Friday night 8pm ish \n` +
        `F - Saturday afternoon 3pm ish \n` +
        `G - Saturday night 8pm ish \n` +
        `H - Sunday afternoon 3pm ish \n` +
        `I - Sunday night 8pm ish`).then(async function (message){
            await message.react('🇦'),
            await message.react('🇧'),
            await message.react('🇨'),
            await message.react('🇩'),
            await message.react('🇪'),
            await message.react('🇫'),
            await message.react('🇬'),
            await message.react('🇭'),
            await message.react('🇮');
        })
    }
}