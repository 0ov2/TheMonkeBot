module.exports = {
    name: 'autoAvailability',
    async execute(client){
        await client.channels.cache.get("761305181827629076").send("<@&" + "803453345187889174" + ">\n" + 
        'A - Monday 19 UTC \n' +
        'B - Tuesday 19 UTC \n' +
        'C - Wednesday 19 UTC \n' +
        'D - Thursday 19 UTC \n' +
        'E - Friday 19 UTC \n' +
        'F - Saturday 19 UTC \n' +
        'G - Sunday 19 UTC').then(function (message){
            message.react('🇦'),
            message.react('🇧'),
            message.react('🇨'),
            message.react('🇩'),
            message.react('🇪'),
            message.react('🇫'),
            message.react('🇬');
        })
    }
}

