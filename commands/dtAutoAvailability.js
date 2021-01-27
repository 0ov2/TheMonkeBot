module.exports = {
    name: 'dtAutoAvailability',
    async execute(client){
        await client.channels.cache.get("761305214677811210").send("<@&" + "803453407045746699" + ">\n" + 
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