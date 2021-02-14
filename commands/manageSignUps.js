const fs = require('fs');
module.exports = {
    name: 'managesignups',
    async execute(user, message){
        var stream = fs.createWriteStream("./messageIDs/dtfSignedUpIds.txt", {flags:'a'});
        var optionsR = {encoding: 'utf-8', flag: 'r'};

        fs.readFile('./messageIDs/dtfSignedUpIds.txt', optionsR, function(err, data) {
            let dataArray = data.split('\n');

            for (let i = 0; i < dataArray.length; i++) {
                if (dataArray[i].trim() == user) {
                    message.reply("User already signed up.");
                    return;
                }
            }

            stream.write(user + "\n");
        });
    }
}
