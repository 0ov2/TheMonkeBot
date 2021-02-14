const fs = require('fs');

async function checkBiMessageId(reaction) {
    var optionsR = {encoding: 'utf-8', flag: 'r'};

    fs.readFile('./messageIDs/biAvailabilityMessageIds.txt', optionsR, function(err, data) {
        let dataArray = data.split('\n');

        for (let i = 0; i < dataArray.length; i++) {
            if (dataArray[i].trim() == reaction.message.id) {
                return true;
            }
            return false;
        }
    });
}

module.exports = checkBiMessageId;