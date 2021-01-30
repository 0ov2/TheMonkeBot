var GetMatchTime = require("./getMatchTime");

module.exports = {
    name: 'dtMatchAnnouncement',
    async execute(client, chanid){
        var matchTime = GetMatchTime(3);

        await client.channels.cache.get(chanid).send("<@&" + "438518647003021315" + ">" + ` Sunday ${matchTime} vs OP`).then(async function (message){
           await message.react('🦧');
        })

        client.on('messageReactionAdd', async (reaction, user) => {

            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;

            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();

            console.log(reaction.message.id);
            var countA = reaction.message.reactions.cache.get('🦧').count;
            
            if (countA > 2) {
                await reaction.message.reactions.resolve('🦧').users.remove(user.bot.id);
            }
        })
    }
}