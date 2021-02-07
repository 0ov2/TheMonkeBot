module.exports = {
    name: 'createmxfchannels',
    async execute(message) {

        let category = await message.guild.channels.cache.find(cat => cat.name === "DTF");

        //EU
        await message.guild.channels.create('🟦 🇪 🇺 BLUE 1', {
            type: 'voice',
            parent: category,
        })

        await message.guild.channels.create('🟥 🇪 🇺 RED 1', {
            type: 'voice',
            parent: category,
        })

        await message.guild.channels.create('🟦 🇪 🇺 BLUE 2', {
            type: 'voice',
            parent: category,
        })

        await message.guild.channels.create('🟥 🇪 🇺 RED 2', {
            type: 'voice',
            parent: category,
        })

        //NA
        await message.guild.channels.create('🟦 🇳 🇦 BLUE 1', {
            type: 'voice',
            parent: category,
        })

        await message.guild.channels.create('🟥 🇳 🇦 RED 1', {
            type: 'voice',
            parent: category,
        })

        await message.guild.channels.create('🟦 🇳 🇦 BLUE 2', {
            type: 'voice',
            parent: category,
        })

        await message.guild.channels.create('🟥 🇳 🇦 RED 2', {
            type: 'voice',
            parent: category,
        })
    }
}