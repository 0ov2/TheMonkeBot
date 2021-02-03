module.exports = {
    name: 'createmxfchannels',
    async execute(message) {

        let category = await message.guild.channels.cache.find(cat => cat.name === "DTF");

        //EU
        await message.guild.channels.create('🟦 🇪 🇺 GROUP A BLUE', {
            type: 'voice',
            parent: category,
        })

        await message.guild.channels.create('🟥 🇪 🇺 GROUP A RED', {
            type: 'voice',
            parent: category,
        })

        await message.guild.channels.create('🟦 🇪 🇺 GROUP B BLUE', {
            type: 'voice',
            parent: category,
        })

        await message.guild.channels.create('🟥 🇪 🇺 GROUP B RED', {
            type: 'voice',
            parent: category,
        })

        //NA
        await message.guild.channels.create('🟦 🇳 🇦 GROUP A BLUE', {
            type: 'voice',
            parent: category,
        })

        await message.guild.channels.create('🟥 🇳 🇦 GROUP A RED', {
            type: 'voice',
            parent: category,
        })

        await message.guild.channels.create('🟦 🇳 🇦 GROUP B BLUE', {
            type: 'voice',
            parent: category,
        })

        await message.guild.channels.create('🟥 🇳 🇦 GROUP B RED', {
            type: 'voice',
            parent: category,
        })
    }
}