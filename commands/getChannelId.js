function GetChannel(client, Name) {
    try {
        if (!client.channels.cache.find(ch => ch.name === Name)){
            return;
        } else {
            return client.channels.cache.find(ch => ch.name === Name);
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = GetChannel;