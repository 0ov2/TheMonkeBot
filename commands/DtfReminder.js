const fs = require('fs');
const readline = require('readline');

module.exports = {
    name: 'dtfreminder',
    async execute(client, chan) {
        var users = [];
        var options = {encoding: 'utf-8', flag: 'r'};
        var reminderMessage = "1 hour warning! Please remove your emote if you can't make it or can't play 3 maps, so we can get an accurate head count! ";

        fs.readFile('./messageIDs/dtfSignedUpIds.txt', options, async function(err, data) {
            let dataArray = await data.split('\n');

            for (let i = 0; i < dataArray.length; i++) {
                if (dataArray[i] !== '' ) {
                    users.push("<@" + dataArray[i] + ">");
                }
            }

            chan.send(users.toString() + " " + reminderMessage);
        });
    }
}