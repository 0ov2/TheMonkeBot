module.exports = {
    name: 'welcomeMessage',
    async execute(channelID, client, member, Discord){
        let embed = new Discord.MessageEmbed()
        .setTitle('New bait has arrived!')
        .setColor("ORANGE")
        .setDescription('Welcome ' + `${member.user}` + '\n' 
        + 'Check out ' + "<#803779865190203422>" + ' if you are interested in the mixed friendly that happens every saturday!' + '\n' 
        + 'then head on over to ' + "<#803417327210201108>" + ' and sign up!')

        await channelID.send(embed);
    }
}