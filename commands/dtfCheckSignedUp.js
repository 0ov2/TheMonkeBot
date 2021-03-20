const fs = require('fs');

module.exports = {
    name: 'dtfchecksignedup',
    async execute(chan, client) {

        var users = [];
        var usersNotFound = [];
        var options = {encoding: 'utf-8', flag: 'r'};

        fs.readFile('./messageIDs/dtfSignedUpIds.txt', options, async function(err, data) {
            let dataArray = data.split('\n');

            const serverId = await client.guilds.cache.get(client.guilds.cache.firstKey());

            for (let i = 0; i < dataArray.length; i++) {
                if (dataArray[i] !== '' ) {
                    if (serverId.client.users.cache.get(dataArray[i])){

                        var user = serverId.client.users.cache.get(dataArray[i])
                        users.push(user.username + ' ' + user.id);

                    } else {
                        usersNotFound.push(dataArray[i].toString());
                    }
                }
            }
            if (users.length > 0){
                if(usersNotFound.toString() == ""){
                    chan.send(users.toString() + ` Total: ${users.length.toString()}`);
                }else {
                    chan.send('Users not found:' + '\n');
                    chan.send(usersNotFound.toString() + " ");
                    chan.send('Users found:' + '\n');
                    chan.send(users.toString() + " ");
                }
            } else {
                chan.send('No one is signed up!');
            }
            
        });
    }
}