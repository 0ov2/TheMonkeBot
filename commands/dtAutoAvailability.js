var GetMatchTime = require("./getMatchTime");

module.exports = {
    name: 'dtAutoAvailability',
    async execute(client, chanid){   
        var matchTimeEu = GetMatchTime(3);
        var matchTimeNa = GetMatchTime(8); 
        
        await client.channels.cache.get(chanid).send("<@&" + "438518647003021315" + ">\n" + 
        `A - Monday night ${matchTimeNa} ish \n` +
        `B - Tuesday night ${matchTimeNa} ish \n` +
        `C - Wednesday night ${matchTimeNa} ish \n` +
        `D - Thursday night ${matchTimeNa} ish \n` +
        `E - Friday night ${matchTimeNa} ish \n` +
        `F - Saturday afternoon ${matchTimeEu} ish \n` +
        `G - Saturday night ${matchTimeNa} ish \n` +
        `H - Sunday afternoon ${matchTimeEu} ish \n` +
        `I - Sunday night ${matchTimeNa} ish`).then(function (message){
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

        client.on('messageReactionAdd', async (reaction, user) => {

            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;

            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();

            console.log(reaction.message.id);
            var countA = reaction.message.reactions.cache.get('🇦').count;
            var countB = reaction.message.reactions.cache.get('🇧').count;
            var countC = reaction.message.reactions.cache.get('🇨').count;
            var countD = reaction.message.reactions.cache.get('🇩').count;
            var countE = reaction.message.reactions.cache.get('🇪').count;
            var countF = reaction.message.reactions.cache.get('🇫').count;
            var countG = reaction.message.reactions.cache.get('🇬').count;
            var countH = reaction.message.reactions.cache.get('🇭').count;
            var countI = reaction.message.reactions.cache.get('🇮').count;

            
            if (countA > 2) {
                await reaction.message.reactions.resolve('🇦').users.remove(user.bot.id);
            } else if (countB > 2) {
                await reaction.message.reactions.resolve('🇧').users.remove(user.bot.id);
            } else if (countC > 2) {
                await reaction.message.reactions.resolve('🇨').users.remove(user.bot.id);
            } else if (countD > 2) {
                await reaction.message.reactions.resolve('🇩').users.remove(user.bot.id);
            } else if (countE > 2) {
                await reaction.message.reactions.resolve('🇪').users.remove(user.bot.id);
            } else if (countF > 2) {
                await reaction.message.reactions.resolve('🇫').users.remove(user.bot.id);
            } else if (countG > 2) {
                await reaction.message.reactions.resolve('🇬').users.remove(user.bot.id);
            } else if (countH > 2) {
                await reaction.message.reactions.resolve('🇭').users.remove(user.bot.id);
            } else if (countI > 2) {
                await reaction.message.reactions.resolve('🇮').users.remove(user.bot.id);
            }
        })
    }
}