module.exports = {
    name: 'deletemxfchannels',
    async execute(message) {

    //EU
    if(!message.guild.channels.cache.find(cat=> cat.name == "🟦 🇪 🇺 GROUP A BLUE")) return;
    const euGroupABlueChannel = message.guild.channels.cache.find(cat=> cat.name == "🟦 🇪 🇺 GROUP A BLUE");
    await euGroupABlueChannel.delete();

    if(!message.guild.channels.cache.find(cat=> cat.name == "🟥 🇪 🇺 GROUP A RED")) return;
    const euGroupARedChannel = message.guild.channels.cache.find(cat=> cat.name == "🟥 🇪 🇺 GROUP A RED");
    await euGroupARedChannel.delete();

    if(!message.guild.channels.cache.find(cat=> cat.name == "🟦 🇪 🇺 GROUP B BLUE")) return;
    const euGroupBBlueChannel = message.guild.channels.cache.find(cat=> cat.name == "🟦 🇪 🇺 GROUP B BLUE");
    await euGroupBBlueChannel.delete();

    if(!message.guild.channels.cache.find(cat=> cat.name == "🟥 🇪 🇺 GROUP B RED")) return;
    const euGroupBRedChannel = message.guild.channels.cache.find(cat=> cat.name == "🟥 🇪 🇺 GROUP B RED");
    await euGroupBRedChannel.delete();

    //NA
    if(!message.guild.channels.cache.find(cat=> cat.name == "🟦 🇳 🇦 GROUP A BLUE")) return;
    const naGroupABlueChannel = message.guild.channels.cache.find(cat=> cat.name == "🟦 🇳 🇦 GROUP A BLUE");
    await naGroupABlueChannel.delete();

    if(!message.guild.channels.cache.find(cat=> cat.name == "🟥 🇳 🇦 GROUP A RED")) return;
    const naGroupARedChannel = message.guild.channels.cache.find(cat=> cat.name == "🟥 🇳 🇦 GROUP A RED");
    await naGroupARedChannel.delete();

    if(!message.guild.channels.cache.find(cat=> cat.name == "🟦 🇳 🇦 GROUP B BLUE")) return;
    const naGroupBBlueChannel = message.guild.channels.cache.find(cat=> cat.name == "🟦 🇳 🇦 GROUP B BLUE");
    await naGroupBBlueChannel.delete();

    if(!message.guild.channels.cache.find(cat=> cat.name == "🟥 🇳 🇦 GROUP B RED")) return;
    const naGroupBRedChannel = message.guild.channels.cache.find(cat=> cat.name == "🟥 🇳 🇦 GROUP B RED");
    await naGroupBRedChannel.delete();
    }
}