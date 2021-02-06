module.exports = {
    name: 'opMatchAnnouncement',
    async execute(client, chanid){  
                                               
        client.channels.cache.get(chanid).send("<@&" + "796855448678563890" + "> Sunday 20 UTC vs DT ").then(async function (message){
            await message.react('🦧');
        })

        client.on('messageReactionAdd', async (reaction, user) => {

            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;

            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (reaction.message.channel.id === chanid) {
                console.log(reaction.message.id);
                var countA = await reaction.message.reactions.cache.get('🦧').count;
                
                if (countA > 2) {
                    await reaction.message.reactions.resolve('🦧').users.remove(user.bot.id);
                }
            }
        })
    }
}