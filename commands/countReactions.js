module.exports = {
    name: 'countreactions',
    async execute(reaction, user) {
        if (reaction.message.partial) await reaction.message.fetch();
        if (reaction.partial) await reaction.fetch();

        var count = await reaction.message.reactions.cache.get(reaction.emoji.name).count; 
    
        if (count > 2) {
            await reaction.message.reactions.resolve(reaction.emoji.name).users.remove(user.bot.id);
        }
    } 
}