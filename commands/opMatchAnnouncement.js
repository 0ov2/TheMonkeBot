module.exports = {
    name: 'opMatchAnnouncement',
    async execute(client){
        await client.channels.cache.get("803397507182624778").send("<@&" + "803453345187889174" + "> Sunday 19 UTC vs DT ").then(function (message){
            message.react('🦧');
        })
    }
}