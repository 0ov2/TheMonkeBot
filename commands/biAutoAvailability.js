var getChannel = require('./getChannelId');
// NOT USED ATM
module.exports = {
    name: 'biAutoAvailability',
    async execute(client, chanid){    
        var chanId = getChannel(client, 'bi-availability');

        await client.channels.cache.get(chanid).send("<@&" + "804170403562913812" + ">\n" + 
        'Monday').then(async function (message){
            await message.react('8️⃣'),
            await message.react('9️⃣'),
            await message.react('🔟');

            client.on('messageReactionAdd', async (reaction, user) => {

                if (reaction.message.partial) await reaction.message.fetch();
                if (reaction.partial) await reaction.fetch();
                if (user.bot) return;
                
                if (reaction.message.channel.id === chanId.id) {
                    var countA = await reaction.message.reactions.cache.get('8️⃣').count;
                    var countB = await reaction.message.reactions.cache.get('9️⃣').count;
                    var countC = await reaction.message.reactions.cache.get('🔟').count;
        
                    
                    if (countA > 2) {
                        await reaction.message.reactions.resolve('8️⃣').users.remove(user.bot.id);
                    } else if (countB > 2) {
                        await reaction.message.reactions.resolve('9️⃣').users.remove(user.bot.id);
                    } else if (countC > 2) {
                        await reaction.message.reactions.resolve('🔟').users.remove(user.bot.id);
                    }
                } else {
                    return;
                }
            })
        })

        client.channels.cache.get(chanid).send( 
        'Tuesday').then(async function (message){
            await message.react('8️⃣'),
            await message.react('9️⃣'),
            await message.react('🔟');

            client.on('messageReactionAdd', async (reaction, user) => {

                if (reaction.message.partial) await reaction.message.fetch();
                if (reaction.partial) await reaction.fetch();
                if (user.bot) return;
    
                if (reaction.message.partial) await reaction.message.fetch();
                if (reaction.partial) await reaction.fetch();
                if (reaction.message.channel.id === chanId.id) {
                    var countA = await reaction.message.reactions.cache.get('8️⃣').count;
                    var countB = await reaction.message.reactions.cache.get('9️⃣').count;
                    var countC = await reaction.message.reactions.cache.get('🔟').count;
        
                    
                    if (countA > 2) {
                        await reaction.message.reactions.resolve('8️⃣').users.remove(user.bot.id);
                    } else if (countB > 2) {
                        await reaction.message.reactions.resolve('9️⃣').users.remove(user.bot.id);
                    } else if (countC > 2) {
                        await reaction.message.reactions.resolve('🔟').users.remove(user.bot.id);
                    }
                } else {
                    return;
                }
            })
        })

        client.channels.cache.get(chanid).send( 
        'Wednesday').then(async function (message){
            await message.react('8️⃣'),
            await message.react('9️⃣'),
            await message.react('🔟');

            client.on('messageReactionAdd', async (reaction, user) => {

                if (reaction.message.partial) await reaction.message.fetch();
                if (reaction.partial) await reaction.fetch();
                if (user.bot) return;
    
                if (reaction.message.partial) await reaction.message.fetch();
                if (reaction.partial) await reaction.fetch();
                if (reaction.message.channel.id === chanId.id) {
                    var countA = await reaction.message.reactions.cache.get('8️⃣').count;
                    var countB = await reaction.message.reactions.cache.get('9️⃣').count;
                    var countC = await reaction.message.reactions.cache.get('🔟').count;
        
                    
                    if (countA > 2) {
                        await reaction.message.reactions.resolve('8️⃣').users.remove(user.bot.id);
                    } else if (countB > 2) {
                        await reaction.message.reactions.resolve('9️⃣').users.remove(user.bot.id);
                    } else if (countC > 2) {
                        await reaction.message.reactions.resolve('🔟').users.remove(user.bot.id);
                    }
                } else {
                    return;
                }
            })
        })

        client.channels.cache.get(chanid).send(
        'Thursday').then(async function (message){
            await message.react('8️⃣'),
            await message.react('9️⃣'),
            await message.react('🔟');

            client.on('messageReactionAdd', async (reaction, user) => {

                if (reaction.message.partial) await reaction.message.fetch();
                if (reaction.partial) await reaction.fetch();
                if (user.bot) return;
    
                if (reaction.message.partial) await reaction.message.fetch();
                if (reaction.partial) await reaction.fetch();
                if (reaction.message.channel.id === chanId.id) {
                    var countA = await reaction.message.reactions.cache.get('8️⃣').count;
                    var countB = await reaction.message.reactions.cache.get('9️⃣').count;
                    var countC = await reaction.message.reactions.cache.get('🔟').count;
        
                    
                    if (countA > 2) {
                        await reaction.message.reactions.resolve('8️⃣').users.remove(user.bot.id);
                    } else if (countB > 2) {
                        await reaction.message.reactions.resolve('9️⃣').users.remove(user.bot.id);
                    } else if (countC > 2) {
                        await reaction.message.reactions.resolve('🔟').users.remove(user.bot.id);
                    }
                } else {
                    return;
                } 
            })
        })

        client.channels.cache.get(chanid).send( 
        'Friday').then(async function (message){
            await message.react('8️⃣'),
            await message.react('9️⃣'),
            await message.react('🔟');

            client.on('messageReactionAdd', async (reaction, user) => {

                if (reaction.message.partial) await reaction.message.fetch();
                if (reaction.partial) await reaction.fetch();
                if (user.bot) return;
    
                if (reaction.message.partial) await reaction.message.fetch();
                if (reaction.partial) await reaction.fetch();
                if (reaction.message.channel.id === chanId.id) {
                    var countA = await reaction.message.reactions.cache.get('8️⃣').count;
                    var countB = await reaction.message.reactions.cache.get('9️⃣').count;
                    var countC = await reaction.message.reactions.cache.get('🔟').count;
        
                    
                    if (countA > 2) {
                        await reaction.message.reactions.resolve('8️⃣').users.remove(user.bot.id);
                    } else if (countB > 2) {
                        await reaction.message.reactions.resolve('9️⃣').users.remove(user.bot.id);
                    } else if (countC > 2) {
                        await reaction.message.reactions.resolve('🔟').users.remove(user.bot.id);
                    }
                } else {
                    return;
                }
            })
        })

        client.channels.cache.get(chanid).send( 
        'Saturday').then(async function (message){
            await message.react('8️⃣'),
            await message.react('9️⃣'),
            await message.react('🔟');

            client.on('messageReactionAdd', async (reaction, user) => {

                if (reaction.message.partial) await reaction.message.fetch();
                if (reaction.partial) await reaction.fetch();
                if (user.bot) return;
    
                if (reaction.message.partial) await reaction.message.fetch();
                if (reaction.partial) await reaction.fetch();
                if (reaction.message.channel.id === chanId.id) {
                    var countA = await reaction.message.reactions.cache.get('8️⃣').count;
                    var countB = await reaction.message.reactions.cache.get('9️⃣').count;
                    var countC = await reaction.message.reactions.cache.get('🔟').count;
        
                    
                    if (countA > 2) {
                        await reaction.message.reactions.resolve('8️⃣').users.remove(user.bot.id);
                    } else if (countB > 2) {
                        await reaction.message.reactions.resolve('9️⃣').users.remove(user.bot.id);
                    } else if (countC > 2) {
                        await reaction.message.reactions.resolve('🔟').users.remove(user.bot.id);
                    }
                } else {
                    return;
                }
            })
        })

        client.channels.cache.get(chanid).send(
        'Sunday').then(async function (message){
            await message.react('8️⃣'),
            await message.react('9️⃣'),
            await message.react('🔟');

            client.on('messageReactionAdd', async (reaction, user) => {

                if (reaction.message.partial) await reaction.message.fetch();
                if (reaction.partial) await reaction.fetch();
                if (user.bot) return;
    
                if (reaction.message.partial) await reaction.message.fetch();
                if (reaction.partial) await reaction.fetch();
                if (reaction.message.channel.id === chanId.id) {
                    var countA = await reaction.message.reactions.cache.get('8️⃣').count;
                    var countB = await reaction.message.reactions.cache.get('9️⃣').count;
                    var countC = await reaction.message.reactions.cache.get('🔟').count;
        
                    
                    if (countA > 2) {
                        await reaction.message.reactions.resolve('8️⃣').users.remove(user.bot.id);
                    } else if (countB > 2) {
                        await reaction.message.reactions.resolve('9️⃣').users.remove(user.bot.id);
                    } else if (countC > 2) {
                        await reaction.message.reactions.resolve('🔟').users.remove(user.bot.id);
                    }
                } else {
                    return;
                }
            })
        })
    }
}