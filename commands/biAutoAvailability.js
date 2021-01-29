module.exports = {
    name: 'biAutoAvailability',
    async execute(client, chanid){             //                                   
        await client.channels.cache.get(chanid).send("<@&" + "804170403562913812" + ">\n" + 
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