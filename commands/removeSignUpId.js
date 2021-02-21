const fs = require('fs');
module.exports = {
    name: 'removesignupid',
    async execute(user){
        var optionsR = {encoding: 'utf-8', flag: 'r'};

        fs.readFile('./messageIDs/dtfSignedUpIds.txt', optionsR, async function(err, data) {
            let dataArray = data.split('\n');

            for (let i = 0; i < dataArray.length; i++) {
                if (dataArray[i].trim() === user.id) {
                    dataArray.splice(i, 1);
                }
            }
        
            const updatedData = dataArray.join('\n');
            await fs.writeFile('./messageIDs/dtfSignedUpIds.txt', updatedData, (err) => {
                if (err) throw err;
                console.log(user.id + ' ' + user.username + ' ID removed from signup');
            });
        });
    }
}
