const getRole = require('./getRole')
const getChannel = require('./getChannelId');

module.exports = {
    name: 'lfgmessage',
    async execute(client, Discord, message){

        const pavlovRole = getRole(client, 'pavlov-lfg', message);
        const pop1Role = getRole(client, 'pop1-lfg', message);

        const lfgChan = getChannel(client, 'lfg-role-claim');

        // role claim
        let embed = new Discord.MessageEmbed()
        .setTitle('React to the role you want!')
        .setColor("ORANGE")
        .setDescription('🍆 - Pavlov \n' + '💦 - Population One') 
       
        await client.channels.cache.get(lfgChan.id).send(embed).then(async function (message){
            await message.react('🍆');
            await message.react('💦');
        })

        client.on('messageReactionAdd', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (!reaction.message.guild) return;
        
            if (reaction.message.channel.id == lfgChan.id) {
                if (reaction.emoji.name === '🍆'){
                    await reaction.message.guild.members.cache.get(user.id).roles.add(pavlovRole.id);
                }else if (reaction.emoji.name === '💦') {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(pop1Role.id);
                }else {
                    await reaction.remove();
                }
            }
        });

        client.on('messageReactionRemove', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (!reaction.message.guild) return;
            if (reaction.message.channel.id == lfgChan.id) {
                if (reaction.emoji.name === '🍆'){
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(pavlovRole.id);
                } else if (reaction.emoji.name === '💦') {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(pop1Role.id);
                }
            }
        });
    }
}