module.exports = {
    name: 'clear',
    async execute(message, args){
        if (!args[0]) return message.reply("You must specify how many messages you want to delete");
        if (isNaN(args[0])) return message.reply("Please use a number");

        if (args[0] > 100) return message.reply("only <100 is accepted at one time");

        await message.channel.messages.fetch({Limit: args[0]}).then(messages => {
            message.channel.bulkDelete(messages);
        })
    }
}