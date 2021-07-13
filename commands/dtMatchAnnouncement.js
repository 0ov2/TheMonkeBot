var GetMatchTime = require("./getMatchTime");

module.exports = {
    name: 'dtMatchAnnouncement',
    async execute(client, chanid, dreamRole){
        // var matchTime = GetMatchTime(3);

        await client.channels.cache.get(chanid.id).send("<@&" + dreamRole + ">" + ` Sunday 3pm vs OP`).then(async function (message){
            await message.react('👍');
        })
    }
}