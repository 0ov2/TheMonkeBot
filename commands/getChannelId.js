function GetChannel(client, Name) {
    if (!client.channels.cache.find(ch => ch.name === Name)){
        return;
    } else {
        return client.channels.cache.find(ch => ch.name === Name);
    }
}

module.exports = GetChannel;