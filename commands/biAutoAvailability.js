module.exports = {
    name: 'biAutoAvailability',
    async execute(client){
        await client.channels.cache.get("804500895865372722").send("<@&" + "804508751108243506" + ">\n" + 
        'A - Monday night 8pm ish \n' +
        'B - Tuesday night 8pm ish \n' +
        'C - Wednesday night 8pm ish \n' +
        'D - Thursday night 8pm ish \n' +
        'E - Friday night 8pm ish \n' +
        'F - Saturday afternoon 3pm \n' +
        'G - Saturday night 8pm ish \n' +
        'H - Sunday afternoon 3pm ish \n' +
        'I - Sunday night 8pm ish').then(function (message){
            message.react('🇦'),
            message.react('🇧'),
            message.react('🇨'),
            message.react('🇩'),
            message.react('🇪'),
            message.react('🇫'),
            message.react('🇬'),
            message.react('🇭'),
            message.react('🇮');
        })
    }
}