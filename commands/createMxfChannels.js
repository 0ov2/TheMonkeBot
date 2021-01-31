module.exports = {
    name: 'createmxfchannels',
    async execute(message) {
        await message.guild.channels.create('mxfchannels', {
            type: 'category',
        })

        let category = await message.guild.channels.cache.find(cat => cat.name === "mxfchannels");

        await message.guild.channels.create('mxf', {
            type: 'voice',
            parent: category,
        })

        await message.guild.channels.create('🟦GROUP A BLUE', {
            type: 'voice',
            parent: category,
        })

        await message.guild.channels.create('🟥GROUP A RED', {
            type: 'voice',
            parent: category,
        })

        await message.guild.channels.create('🟦GROUP B BLUE', {
            type: 'voice',
            parent: category,
        })

        await message.guild.channels.create('🟥GROUP B RED', {
            type: 'voice',
            parent: category,
        })
    }
}