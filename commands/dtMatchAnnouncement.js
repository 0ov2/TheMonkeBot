module.exports = {
    name: 'dtMatchAnnouncement',
    async execute(client){
        await client.channels.cache.get("803432126836899901").send("<@&" + "803453407045746699" + "> Sunday 3pm vs OP ").then(function (message){
            message.react('🦧');
        })
    }
}