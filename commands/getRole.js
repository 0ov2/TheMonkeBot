function GetRole(client, Name, message) {

    const myGuild = client.guilds.cache.get(message.guild.id);

    if (!myGuild.roles.cache.find(role => role.name === Name)){
        return;
    } else {
        return myGuild.roles.cache.find(role => role.name === Name);   
    }
}

module.exports = GetRole;