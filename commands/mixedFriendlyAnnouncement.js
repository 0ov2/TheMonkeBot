var today = new Date();
today.setDate(today.getDate() + 7);
var dd = String(today.getDay());
var mm = String(today.getMonth() + 1);
var yy = String(today.getFullYear());
var newDate = dd + '.' + mm + '.' + yy;

module.exports = {
    name: 'mixedFriendlyAnnouncement',
    async execute(client){
        await client.channels.cache.get("803417327210201108").send("<@&" + "803449090300968971" + "> Saturday " + newDate + ' - 19 UTC / 20 CEST / 14 EST.' + '\n' + 'React with a single unique emoji!' + '\n' + 'GROUP A').then(function (message){
            message.react('🦧');
        })

        await client.channels.cache.get("803417327210201108").send("<@&" + "803449090300968971" + "> Saturday " + newDate + ' - 19 UTC / 20 CEST / 14 EST.' + '\n' + 'React with a single unique emoji!' + '\n' + 'GROUP B');
    }
}