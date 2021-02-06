function GetRole(client, Name, message, reaction) {

    if (message !== '') {
        const myGuild = client.guilds.cache.get(message.guild.id);

        if (!myGuild.roles.cache.find(role => role.name === Name)){
            return;
        } else {
            return myGuild.roles.cache.find(role => role.name === Name);   
        }
    } else {
        const myGuild = client.guilds.cache.get(reaction.message.guild.id);

        if (!myGuild.roles.cache.find(role => role.name === Name)){
            return;
        } else {
            return myGuild.roles.cache.find(role => role.name === Name);   
        }
    }
}

module.exports = GetRole;