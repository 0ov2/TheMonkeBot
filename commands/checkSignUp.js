const fs = require('fs');
const readline = require('readline');

async function CheckSignUp(user) {
    const fileStream = fs.createReadStream('./messageIDs/dtfSignedUpIds.txt');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    var count = 0;
    for await (const line of rl) {
        if (line == user.id){
            count++
        }
    }
    return count;
}

module.exports = CheckSignUp;