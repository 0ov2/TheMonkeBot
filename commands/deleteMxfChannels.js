module.exports = {
    name: 'deletemxfchannels',
    async execute(client, message) {

    if(!message.guild.channels.cache.find(cat=> cat.name == "🟦GROUP A BLUE")) return;
    const groupABlueChannel = message.guild.channels.cache.find(cat=> cat.name == "🟦GROUP A BLUE");
    groupABlueChannel.delete();

    if(!message.guild.channels.cache.find(cat=> cat.name == "🟥GROUP A RED")) return;
    const groupARedChannel = message.guild.channels.cache.find(cat=> cat.name == "🟥GROUP A RED");
    groupARedChannel.delete();

    if(!message.guild.channels.cache.find(cat=> cat.name == "🟦GROUP B BLUE")) return;
    const groupBBlueChannel = message.guild.channels.cache.find(cat=> cat.name == "🟦GROUP B BLUE");
    groupBBlueChannel.delete();

    if(!message.guild.channels.cache.find(cat=> cat.name == "🟥GROUP B RED")) return;
    const groupBRedChannel = message.guild.channels.cache.find(cat=> cat.name == "🟥GROUP B RED");
    groupBRedChannel.delete();

    if (!message.guild.channels.cache.find(cat=> cat.name == "mxf")) return; 
    const mxfChannel = message.guild.channels.cache.find(cat=> cat.name == "mxf");
    mxfChannel.delete();
    
    if (!message.guild.channels.cache.find(cat=> cat.name == "mxfchannels")) return;
    const catChannel = message.guild.channels.cache.find(cat=> cat.name == "mxfchannels");
    catChannel.delete();
    }
}