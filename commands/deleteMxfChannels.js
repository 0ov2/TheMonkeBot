module.exports = {
    name: 'deletemxfchannels',
    async execute(message) {

    //EU
    if(!message.guild.channels.cache.find(cat=> cat.name == "🔵 🇪 🇺 BLUE 1")) return;
    const euGroupABlueChannel = message.guild.channels.cache.find(cat=> cat.name == "🔵 🇪 🇺 BLUE 1");
    await euGroupABlueChannel.delete();

    if(!message.guild.channels.cache.find(cat=> cat.name == "🟥 🇪 🇺 RED 1")) return;
    const euGroupARedChannel = message.guild.channels.cache.find(cat=> cat.name == "🟥 🇪 🇺 RED 1");
    await euGroupARedChannel.delete();

    if(!message.guild.channels.cache.find(cat=> cat.name == "🔵 🇪 🇺 BLUE 2")) return;
    const euGroupBBlueChannel = message.guild.channels.cache.find(cat=> cat.name == "🔵 🇪 🇺 BLUE 2");
    await euGroupBBlueChannel.delete();

    if(!message.guild.channels.cache.find(cat=> cat.name == "🟥 🇪 🇺 RED 2")) return;
    const euGroupBRedChannel = message.guild.channels.cache.find(cat=> cat.name == "🟥 🇪 🇺 RED 2");
    await euGroupBRedChannel.delete();

    //NA
    if(!message.guild.channels.cache.find(cat=> cat.name == "🔵 🇳 🇦 BLUE 1")) return;
    const naGroupABlueChannel = message.guild.channels.cache.find(cat=> cat.name == "🔵 🇳 🇦 BLUE 1");
    await naGroupABlueChannel.delete();

    if(!message.guild.channels.cache.find(cat=> cat.name == "🟥 🇳 🇦 RED 1")) return;
    const naGroupARedChannel = message.guild.channels.cache.find(cat=> cat.name == "🟥 🇳 🇦 RED 1");
    await naGroupARedChannel.delete();

    if(!message.guild.channels.cache.find(cat=> cat.name == "🔵 🇳 🇦 BLUE 2")) return;
    const naGroupBBlueChannel = message.guild.channels.cache.find(cat=> cat.name == "🔵 🇳 🇦 BLUE 2");
    await naGroupBBlueChannel.delete();

    if(!message.guild.channels.cache.find(cat=> cat.name == "🟥 🇳 🇦 RED 2")) return;
    const naGroupBRedChannel = message.guild.channels.cache.find(cat=> cat.name == "🟥 🇳 🇦 RED 2");
    await naGroupBRedChannel.delete();
    }
}