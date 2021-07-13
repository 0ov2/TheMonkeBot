module.exports = {
    name: 'managesignups',
    async execute(client, option, isTesting){

        if (option == 'update'){
            await client.command.get('managedb').execute('deleteall', 'event_signup_ids', '', client, isTesting);

            var dtfRoleMessage = await client.channels.cache.find(chan => chan.name == 'dream-teams-friendly');
            var messages = await dtfRoleMessage.messages.fetch();
            var dtfEuAv = messages.find(msg => msg.content.includes('if you are an EU player') && msg.author.bot == true); 
            var dtfNaAv = messages.find(msg => msg.content.includes('if you are an NA player') && msg.author.bot == true);

            await dtfEuAv.reactions.cache.forEach(async emoji => {
                dtfEuAv.reactions.resolve(emoji).users.fetch().then(async userList => {
                    userList.forEach(async user => {
                        if (user) {
                            await client.command.get('managedb').execute('insert', 'event_signup_ids', user, client, isTesting);
                        }
                    })
                });
            });
            await dtfNaAv.reactions.cache.forEach(async emoji => {
                dtfNaAv.reactions.resolve(emoji).users.fetch().then(async userList => {
                    userList.forEach(async user => {
                        if (user) {
                            await client.command.get('managedb').execute('insert', 'event_signup_ids', user, client, isTesting);
                        }
                    })
                });
            });
        }
    }
}
