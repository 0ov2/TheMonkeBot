module.exports = {
    name: 'deletemxfchannels',
    async execute(message) {

    //EU
    if(!message.guild.channels.cache.find(cat=> cat.name == "🟦 🇪 🇺 BLUE")) return;
    const euGroupABlueChannel = message.guild.channels.cache.find(cat=> cat.name == "🟦 🇪 🇺 BLUE");
    await euGroupABlueChannel.delete();

    if(!message.guild.channels.cache.find(cat=> cat.name == "🟥 🇪 🇺 RED")) return;
    const euGroupARedChannel = message.guild.channels.cache.find(cat=> cat.name == "🟥 🇪 🇺 RED");
    await euGroupARedChannel.delete();

    if(!message.guild.channels.cache.find(cat=> cat.name == "🟦 🇪 🇺 BLUE")) return;
    const euGroupBBlueChannel = message.guild.channels.cache.find(cat=> cat.name == "🟦 🇪 🇺 BLUE");
    await euGroupBBlueChannel.delete();

    if(!message.guild.channels.cache.find(cat=> cat.name == "🟥 🇪 🇺 RED")) return;
    const euGroupBRedChannel = message.guild.channels.cache.find(cat=> cat.name == "🟥 🇪 🇺 RED");
    await euGroupBRedChannel.delete();

    //NA
    if(!message.guild.channels.cache.find(cat=> cat.name == "🟦 🇳 🇦 BLUE")) return;
    const naGroupABlueChannel = message.guild.channels.cache.find(cat=> cat.name == "🟦 🇳 🇦 BLUE");
    await naGroupABlueChannel.delete();

    if(!message.guild.channels.cache.find(cat=> cat.name == "🟥 🇳 🇦 RED")) return;
    const naGroupARedChannel = message.guild.channels.cache.find(cat=> cat.name == "🟥 🇳 🇦 RED");
    await naGroupARedChannel.delete();

    if(!message.guild.channels.cache.find(cat=> cat.name == "🟦 🇳 🇦 BLUE")) return;
    const naGroupBBlueChannel = message.guild.channels.cache.find(cat=> cat.name == "🟦 🇳 🇦 BLUE");
    await naGroupBBlueChannel.delete();

    if(!message.guild.channels.cache.find(cat=> cat.name == "🟥 🇳 🇦 RED")) return;
    const naGroupBRedChannel = message.guild.channels.cache.find(cat=> cat.name == "🟥 🇳 🇦 RED");
    await naGroupBRedChannel.delete();
    }
}