module.exports = {
    name: 'roleclaim',
    async execute(client, Discord){

        let embed = new Discord.MessageEmbed()
        .setTitle('React for the role!')
        .setColor("ORANGE")
        .setDescription('🦧 - Mixed Friendly')
       
        await client.channels.cache.get("803779865190203422").send(embed).then(function (message){
            message.react('🦧');
        })

        client.on('messageReactionAdd', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;
        
            if (reaction.message.channel.id == "803779865190203422") {
                if (reaction.emoji.name === '🦧'){
                    await reaction.message.guild.members.cache.get(user.id).roles.add("803449090300968971");
                }
            }
        });

        client.on('messageReactionRemove', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;
            if (reaction.message.channel.id == "803779865190203422") {
                if (reaction.emoji.name === '🦧'){
                    await reaction.message.guild.members.cache.get(user.id).roles.remove("803449090300968971");
                }
            }
        });
    }

}