module.exports = {
    name: 'countreactions',
    async execute(reaction, user, team) {
        if (reaction.message.partial) await reaction.message.fetch();
        if (reaction.partial) await reaction.fetch();

        if (team == 'op'){
            var count = await reaction.message.reactions.cache.get(reaction.emoji.name).count; 
    
            if (count > 2) {
                await reaction.message.reactions.resolve(reaction.emoji.name).users.remove(user.bot.id);
            }

        } else if (team == 'dt') {

            var count = await reaction.message.reactions.cache.get(reaction.emoji.name).count;

            if (count > 2) {
                await reaction.message.reactions.resolve(reaction.emoji.name).users.remove(user.bot.id);
            }
            
        } else if (team == 'bi') {

            var count = await reaction.message.reactions.cache.get(reaction.emoji.name).count;

            if (count > 2) {
                await reaction.message.reactions.resolve(reaction.emoji.name).users.remove(user.bot.id);
            }
            
        } else if (team == 'opmatch') {

            var count = await reaction.message.reactions.cache.get(reaction.emoji.name).count;

            if (count > 2) {
                await reaction.message.reactions.resolve(reaction.emoji.name).users.remove(user.bot.id);
            }
            
        } else if (team == 'dtmatch') {

            var count = await reaction.message.reactions.cache.get(reaction.emoji.name).count;

            if (count > 2) {
                await reaction.message.reactions.resolve(reaction.emoji.name).users.remove(user.bot.id);
            }
            
        } else {
            return;
        }
    } 
}