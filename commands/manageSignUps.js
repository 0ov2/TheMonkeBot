const fs = require('fs');
module.exports = {
    name: 'managesignups',
    async execute(user, message, client, option){
        if (option == 'add'){
            var stream = fs.createWriteStream("./messageIDs/dtfSignedUpIds.txt", {flags:'a'});
            var optionsR = {encoding: 'utf-8', flag: 'r'};
    
            fs.readFile('./messageIDs/dtfSignedUpIds.txt', optionsR, async function(err, data) {
                let dataArray = data.split('\n');
                const serverId = client.guilds.cache.get(client.guilds.cache.firstKey());
                var isUser = false;
                await serverId.client.users.cache.forEach(User => {
                    if (User.id == user.toString()){
                        isUser = true;
                    }
                });
    
                if (isUser == true){
                    for (let i = 0; i < dataArray.length; i++) {
                        if (dataArray[i].trim() == user) {
                            message.reply("User already signed up.");
                            return;
                        }
                    }
                } else {
                    return message.reply("User does not exist");
                }
    
                stream.write(user + "\n");
    
            });
        } else if (option == 'del') {
            var optionsR = {encoding: 'utf-8', flag: 'r'};

            fs.readFile('./messageIDs/dtfSignedUpIds.txt', optionsR, function(err, data) {
                let dataArray = data.split('\n');

                for (let i = 0; i < dataArray.length; i++) {
                    if (dataArray[i].trim() === user.toString()) {
                        dataArray.splice(i, 1);
                    }
                }
            
                const updatedData = dataArray.join('\n');
                fs.writeFile('./messageIDs/dtfSignedUpIds.txt', updatedData, (err) => {
                    if (err) throw err;
                    console.log('Successfully updated the file!');
                });
            });
        } else if (option == 'update'){
            var streamR = fs.createWriteStream("./messageIDs/dtfSignedUpIds.txt", {flags:'a'});
            var streamW = fs.createWriteStream("./messageIDs/dtfSignedUpIds.txt", {flags:'w'});
            streamW.write("");

            var dtfRoleMessage = await client.channels.cache.find(chan => chan.name == 'dream-teams-friendly');
            var messages = await dtfRoleMessage.messages.fetch();
            var dtfEuAv = messages.find(msg => msg.content.includes('🇪 🇺') && msg.author.bot == true); 
            var dtfNaAv = messages.find(msg => msg.content.includes('🇳 🇦') && msg.author.bot == true);

            await dtfEuAv.reactions.cache.forEach(async emoji => {
                dtfEuAv.reactions.resolve(emoji).users.fetch().then(userList => {
                    userList.forEach(user => {
                        if (user) {
                            streamR.write(user.id + "\n")
                        }
                    })
                });
            });
            await dtfNaAv.reactions.cache.forEach(async emoji => {
                dtfNaAv.reactions.resolve(emoji).users.fetch().then(userList => {
                    userList.forEach(user => {
                        if (user) {
                            streamR.write(user.id + "\n")
                        }
                    })
                });
            });
        }
    }
}
