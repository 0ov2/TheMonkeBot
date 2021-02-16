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
        } else {
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
        }
    }
}
