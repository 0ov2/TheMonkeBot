var getRole = require('./getRole');
var getChannel = require('./getChannelId');
module.exports = {
    name: 'lfgmessage',
    async execute(client, Discord, chan){
        var dreamAlumni = getRole(client, 'dream alumni');
        var dream = getRole(client, 'dream');
        var op = getRole(client, 'op');
        var opAlumni = getRole(client, 'op-alumni');
        var octane = getRole(client, 'octane');
        var octaneAlumni = getRole(client, 'octane-alumni');
        var lfgChan = getChannel(client, 'looking-for-gamers')

        // role claim
        let embed = new Discord.MessageEmbed()
        .setTitle('Roles')
        .setColor("ORANGE")
        .setDescription('🍆 - Pavlov \n' + '💦 - Population One \n')

        await chan.send("<@&" + dream + "> " + "<@&" + dreamAlumni + ">" + "<@&" + octane + "> " + "<@&" + octaneAlumni + "> " + "<@&" + op + "> " + "<@&" + opAlumni + "> " + ` Please react to the emotes below to get the Pavlov LFG, Pop1 LFG and Walkabout Mini Golf LFG roles which will be used in <#${lfgChan.id}> when people want to find others to play with!`);

        client.channels.cache.get(chan.id).send(embed).then(async function (message){
            await message.react('🍆');
            await message.react('💦');
        })
    }
}