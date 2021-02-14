const fs = require('fs');
const readline = require('readline');

module.exports = {
    name: 'dtfreminder',
    async execute(client, chan) {
        var users = [];
        var options = {encoding: 'utf-8', flag: 'r'};
        var reminderMessage = "DTF is starting in 1 hour! ";

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