const fs = require('fs');
const readline = require('readline');

async function checkBiMessageId(reaction) {

    const fileStream = fs.createReadStream('./messageIDs/biAvailabilityMessageIds.txt');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    var count = 0;
    for await (const line of rl) {
        if (line == reaction.message.id){
            count++
        }
    }
    return count;
}

module.exports = checkBiMessageId;