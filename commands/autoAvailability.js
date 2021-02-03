module.exports = {
    name: 'autoAvailability',
    async execute(client, ChanID){
        await client.channels.cache.get(ChanID).send("<@&" + "796855448678563890" + ">\n" + //
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

        client.on('messageReactionAdd', async (reaction, user) => {

            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;

            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();

            console.log(reaction.message.id);
            var countA = await reaction.message.reactions.cache.get('🇦').count;
            var countB = await reaction.message.reactions.cache.get('🇧').count;
            var countC = await reaction.message.reactions.cache.get('🇨').count;
            var countD = await reaction.message.reactions.cache.get('🇩').count;
            var countE = await reaction.message.reactions.cache.get('🇪').count;
            var countF = await reaction.message.reactions.cache.get('🇫').count;
            var countG = await reaction.message.reactions.cache.get('🇬').count;

            
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
            }
        })
    }
}

