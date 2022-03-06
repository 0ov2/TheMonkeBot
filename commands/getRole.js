function GetRole(client, Name) {

    const serverId = client.guilds.cache.get(client.guilds.cache.firstKey());
    if (!serverId.roles.cache.find(role => role.name === Name)) {
        return;
    } else {
        return serverId.roles.cache.find(role => role.name === Name); 
    }
}

module.exports = GetRole;